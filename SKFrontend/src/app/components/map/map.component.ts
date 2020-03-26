import { Component, OnInit } from '@angular/core';

import {Bucket} from '../../models/Bucket';
import {Location} from '../../models/Location';
import {CommunicationService} from '../../services/communication.service'
import {OrchestratorService} from '../../services/orchestrator.service'
import {Subscription} from 'rxjs';

import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import OsmSource from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {Icon, Stroke, Style} from 'ol/style';
import {fromLonLat} from 'ol/proj';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';


@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    selectedLocation: Location;
    selectedBucket: Bucket;

    constructor(private communicationService: CommunicationService,
                private orchestratorService: OrchestratorService) { }


    ngOnInit(): void {

        //Style Function to give that colors the locations dynamically
        let locationStyleFunction = function(feature) {

            //default value
            let color = 'green';

            if(feature.get('location') == this.selectedLocation){
                color = 'blue';
            }

            let style = new Style({
                stroke: new Stroke({
                    color: color,
                    width: 7
                })
            })

            return style;
        }.bind(this)

        //Create VectorSource outside the Layer to be able to add Features to it later on
        let locationSource = new VectorSource();

        //Create VectorLayer outside the map to be able to refresh it using fenceLayer.changed()
        let locationLayer = new VectorLayer({
            source: locationSource,
            style: locationStyleFunction
        })



        //Style Function to give the markers a dynamic Icon that changes base on bucket values
        let bucketStyleFunction = function(feature) {

            let bucket = feature.get('bucket');

            //Default values
            let scale = 0.07;
            let color = 'white';

            //Make the marker larger if it is selected
            if(this.selectedBucket == feature.get('bucket')){
                scale = 0.1;
            }

            //Color the bucket based on fill status
            if(bucket.reserved){
              color = 'cyan';
            } else if(bucket.currentFrogs == 0){
                color = 'lime'; //empty
            } else if(bucket.currentFrogs < bucket.maxFrogs/2) {
                color = 'yellow'; //less than 50% full
            } else if(bucket.currentFrogs < bucket.maxFrogs){
                color = 'orange'; //more than 50% full
            } else {
                color = 'red'; //full
            }

            //Create final Icon
            let style = new Style({
                image: new Icon({
                    src: '/assets/bucket.png',
                    imgSize: [512, 512],
                    scale: scale,
                    color: color
                })
            });

            return style;
        }.bind(this)

        //Create VectorSource outside the Layer to be able to add Features to it later on
        let bucketSource = new VectorSource();

        //Create VectorLayer outside the map to be able to refresh it using bucketLayer.changed()
        let bucketLayer = new VectorLayer({
            source: bucketSource,
            style: bucketStyleFunction
        })

        let view = new View({
            center: fromLonLat([10.4515, 51.1657]),
            zoom: 6.3
        })


        //Create map
        let map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OsmSource()
                }),
                locationLayer,
                bucketLayer
            ],
            view: view
        });

        //Register a click event to be able to select markers
        map.on('click', function(e){
            let selectedLocation = null;
            let selectedBucket = null;

            map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
                if(layer == locationLayer){
                    selectedLocation = feature.get('location');
                }
                if(layer == bucketLayer){
                    selectedBucket = feature.get('bucket');
                }
            }.bind(this));

            //If a bucket is selected, don't select the location below it
            if(selectedBucket != null){
                selectedLocation = null;
            }

            this.orchestratorService.locationSelected(selectedLocation);
            this.orchestratorService.bucketSelected(selectedBucket);
        }.bind(this));


        //Subscribe to locations
        this.communicationService.locations().subscribe(locations => {

            let features = [];
            locations.forEach(location => {

                let locationCoords = [];

                location.routePoints.forEach(point =>
                    locationCoords.push(fromLonLat([point.longitude, point.latitude]))
                );

                features.push(new Feature(({
                    location: location,
                    geometry: new LineString(locationCoords)
                })));

            });

            locationSource.addFeatures(features);
            locationLayer.changed();

        });


        //Subscription to update the selected location
        this.orchestratorService.selectedLocation.subscribe(selectedLocation => {
            this.selectedLocation = selectedLocation;
            locationLayer.changed();

            //Jump to the currently selected location
            if(selectedLocation != null){

                let locationCoords = [];
                selectedLocation.routePoints.forEach(point =>
                    locationCoords.push(fromLonLat([point.longitude, point.latitude]))
                );

                let geometry = new LineString(locationCoords);

                view.fit(geometry);
                view.adjustZoom(-1);
            }
        });


        //Subscribe to buckets
        this.communicationService.buckets().subscribe(buckets => {

            let features = [];
            buckets.forEach(bucket => {

                //Create a feature that holds important information about a bucket for every bucket in the list
                const coords = fromLonLat([bucket.position.longitude, bucket.position.latitude]);
                features.push(new Feature({
                    bucket: bucket,
                    geometry: new Point(coords)
                }));

            });

            //Update VectorSource
            bucketSource.clear();
            bucketSource.addFeatures(features);
        });

        //Subscription to update the selected bucket
        this.orchestratorService.selectedBucket.subscribe(selectedBucket => {
            this.selectedBucket = selectedBucket;
            bucketLayer.changed();

            //Jump to the currently selected bucket
            if(selectedBucket != null){
                view.setCenter(fromLonLat([selectedBucket.position.longitude, selectedBucket.position.latitude]));
                view.setZoom(14);
            }
        });

    }

}
