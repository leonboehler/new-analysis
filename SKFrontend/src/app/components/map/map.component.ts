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

    //Instance of the OL Map
    map: Map;
    //Vector Source containing the buckets
    source: VectorSource;
    //Subscription to obtain the Buckets from the CommunicationService
    subscription: Subscription;
    selectedBucket: number;

    constructor(private communicationService: CommunicationService,
                private orchestratorService: OrchestratorService) { }


    ngOnInit(): void {

        this.subscription = this.communicationService.buckets().subscribe(buckets => {
            this.populateMarkers(buckets);
        });

        //TODO: subscribe to selectedBucket

        this.source = new VectorSource();

        let styleFunction = function(feature) {
            let scale = 0.2;
            let opacity = 0.75;
            let color = 'white';
            if(this.selectedBucket == feature.get('bucketID')){
                scale = 0.25;
                opacity = 1;
            }
            let src = '';
            switch(feature.get('category')){
            case 'own_empty':
                src = '/assets/minecraft_bucket.png';
                color = 'green';
                break;
            case 'own_full':
                src = '/assets/minecraft_bucket.png';
                color = 'red';
                break;
            case 'empty':
                src = '/assets/minecraft_bucket.png';
                color = 'yellow';
                break;
            case 'full':
                src = '/assets/minecraft_bucket.png';
                color = 'orange';
                break;
            }
            let style = new Style({
                image: new Icon({
                    src: src,
                    imgSize: [160, 160],
                    scale: scale,
                    opacity: opacity,
                    color: color
                })
            });
            return style;
        }.bind(this)

        let markerLayer = new VectorLayer({
            source: this.source,
            style: styleFunction
        })

        this.map = new Map({
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

        this.map.on('click', function(e){
            this.orchestratorService.bucketSelected(null)
            this.map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
                this.orchestratorService.bucketSelected(feature.get('bucketID'))
            }.bind(this));
            markerLayer.changed();
        }.bind(this));

    }


    populateMarkers(buckets) {

        this.subscription.unsubscribe();
        let features = [];

        buckets.forEach(bucket => {

            const coords = fromLonLat([bucket.longitude, bucket.latitude]);
            features.push(new Feature({
                bucketID: bucket.id,
                category: 'own_empty',
                geometry: new Point(coords)
            }));

        });

        this.source.addFeatures(features);

    }

}
