import { Component, OnInit } from '@angular/core';

import {Bucket} from '../../models/Bucket';
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

    selectedFence: number;
    selectedBucket: number;

    constructor(private communicationService: CommunicationService,
                private orchestratorService: OrchestratorService) { }


    ngOnInit(): void {

        let fenceStyleFunction = function(feature) {
            let style = new Style({
                stroke: new Stroke({
                    color: 'green',
                    width: 7
                })
            })

            return style;
        }.bind(this)

        //Create VectorSource outside the Layer to be able to add Features to it later on
        let fenceSource = new VectorSource();

        //Create VectorLayer outside the map to be able to refresh it using fenceLayer.changed()
        let fenceLayer = new VectorLayer({
            source: fenceSource,
            style: fenceStyleFunction
        })



        //Style Function to give the markers a dynamic Icon that changes base on bucket values
        let bucketStyleFunction = function(feature) {
            //Default values
            let scale = 0.2;
            let color = 'white';

            //Make the marker larger if it is selected
            if(this.selectedBucket == feature.get('bucketID')){
                scale = 0.25;
            }

            //Color the bucket based on fill status
            if(feature.get('currentFrogs') == 0){
                color = 'lime'; //empty
            } else if(feature.get('currentFrogs') < feature.get('maxFrogs')/2) {
                color = 'yellow'; //less than 50% full
            } else if(feature.get('currentFrogs') < feature.get('maxFrogs')){
                color = 'orange'; //more than 50% full
            } else {
                color = 'red'; //full
            }

            //Create final Icon
            let style = new Style({
                image: new Icon({
                    src: '/assets/minecraft_bucket.png',
                    imgSize: [160, 160],
                    scale: scale,
                    color: color
                })
            });

            return style;
        }.bind(this)


        //Create VectorSource outside the Layer to be able to add Features to it later on
        let fenceSource = new VectorSource();

        //Create VectorLayer outside the map to be able to refresh it using fenceLayer.changed()
        let fenceLayer = new VectorLayer({
            source: fenceSource,
        })

        //Create VectorSource outside the Layer to be able to add Features to it later on
        let bucketSource = new VectorSource();

        //Create VectorLayer outside the map to be able to refresh it using bucketLayer.changed()
        let bucketLayer = new VectorLayer({
            source: bucketSource,
            style: bucketStyleFunction
        })


        //Create map
        let map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OsmSource()
                }),
                fenceLayer,
                bucketLayer
            ],
            view: new View({
                center: fromLonLat([10.4515, 51.1657]),
                zoom: 6.3
            })
        });

        //Register a click event to be able to select markers
        map.on('click', function(e){
            let selected = -1;

            map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
                if(layer == fenceLayer){
                    console.log('Fence clicked');
                    selected = feature.get('bucketID');
                }
            }.bind(this));

            map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
                if(layer == bucketLayer){
                    console.log('Bucket clicked');
                    selected = feature.get('bucketID');
                }
            }.bind(this));

            this.orchestratorService.bucketSelected(selected);
        }.bind(this));


        //TODO load fences dynamically, make them thicker and color them green
        let fenceFeatures = [];

        let fenceCoords = [];
        fenceCoords.push(fromLonLat([13.34545, 34.12313]));
        fenceCoords.push(fromLonLat([14.34545, 35.12313]));
        fenceCoords.push(fromLonLat([16.34545, 31.124513]));

        fenceFeatures.push(new Feature(({
            geometry: new LineString(fenceCoords)
        })));

        fenceSource.addFeatures(fenceFeatures);
        fenceLayer.changed();

        //Subscribe to buckets
        this.communicationService.buckets().subscribe(buckets => {

            let features = [];
            buckets.forEach(bucket => {

                //Create a feature that holds important information about a bucket for every bucket in the list
                const coords = fromLonLat([bucket.longitude, bucket.latitude]);
                features.push(new Feature({
                    bucketID: bucket.id,
                    maxFrogs: bucket.maxFrogs,
                    currentFrogs: bucket.currentFrogs,
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
        });

    }

}
