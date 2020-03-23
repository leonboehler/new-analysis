import { Component, OnInit } from '@angular/core';

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

    features: any = [];
    // array for data-binding
    data: any = {
        bucketID: -1,
        category: ''
    };

    constructor() { }

    ngOnInit(): void {

        this.populateMarkers();

        let source = new VectorSource();
        let selected = null;

        let styleFunction = function(feature) {
            let scale = 0.2;
            let opacity = 0.75;
            let color = 'white';
            if(selected == feature){
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
        }

        let markerLayer = new VectorLayer({
            source: source,
            style: styleFunction
        })

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

        source.addFeatures(this.features);

        map.on('click', function(e){
            selected = null;
            this.data.bucketID = -1
            map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
                selected = feature;
                this.data.bucketID = feature.get('bucketID');
                this.data.category = feature.get('category');
            }.bind(this));
            markerLayer.changed();
        }.bind(this));

    }

    populateMarkers() {

        this.addMarker(1, 'own_empty', 11.55, 50.22);
        this.addMarker(2, 'own_empty', 13.55, 51.22);
        this.addMarker(3, 'own_full', 10.55, 49.22);
        this.addMarker(4, 'full', 9.55, 52.22);
        this.addMarker(5, 'empty', 11.55, 48.22);

    }

    addMarker(bucketID, category, lon, lat) {

        const coords = fromLonLat([lon, lat]);

        this.features.push(new Feature({
            bucketID: bucketID,
            category: category,
            geometry: new Point(coords)
        }));

    }

}
