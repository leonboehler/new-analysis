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
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import {fromLonLat} from 'ol/proj';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';


@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    selectedBucket: number;

    constructor(private communicationService: CommunicationService,
                private orchestratorService: OrchestratorService) { }


    ngOnInit(): void {

        //Style Function to give the markers a dynamic Icon that changes base on bucket values
        let styleFunction = function(feature) {
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
        let source = new VectorSource();

        //Create VectorLayer outside the map to be able to refresh it using markerLayer.changed()
        let markerLayer = new VectorLayer({
            source: source,
            style: styleFunction
        })

        //Create map
        let map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OsmSource()
                }),
                markerLayer
            ],
            view: new View({
                center: fromLonLat([10.4515, 51.1657]),
                zoom: 6.3
            })
        });

        //Register a click event to be able to select markers
        map.on('click', function(e){
            let selected = null;
            map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
                selected = feature.get('bucketID');
            }.bind(this));
            this.orchestratorService.bucketSelected(selected);
        }.bind(this));


        //Subscribe to buckets
        let subscription = this.communicationService.buckets().subscribe(buckets => {
            //Instantly unsubscribe after recieving the buckets once
            subscription.unsubscribe();

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

            //Add all new features to the VectorSource
            source.addFeatures(features);
        });

        //TODO: subscribe to selectedBucket
        //has to include markerLayer.changed();

    }

}
