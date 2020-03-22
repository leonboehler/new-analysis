import { Component, OnInit } from '@angular/core';
import * as ol from 'ol';

declare var ol: any;

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

        let source = new ol.source.Vector();
        let selected = null;

        let styleFunction = function(feature) {
            let scale = 0.2;
            let opacity = 0.75;
            if(selected == feature){
                scale = 0.25;
                opacity = 1;
            }
            let src = '';
            switch(feature.get('category')){
            case 'own_empty':
                src = '/app/map/minecraft_bucket.png';
                break;
            case 'own_full':
                src = '/app/map/minecraft_bucket.png';
                break;
            case 'empty':
                src = '/app/map/minecraft_bucket.png';
                break;
            case 'full':
                src = '/app/map/minecraft_bucket.png';
                break;
            }
            let style = new ol.style.Style({
                image: new ol.style.Icon({
                    src: src,
                    imgSize: [160, 160],
                    scale: scale,
                    opacity: opacity
                })
            });
            return style;
        }

        let markerLayer = new ol.layer.Vector({
            source: source,
            style: styleFunction
        })

        let map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),
                markerLayer
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([10.4515, 51.1657]),
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

        this.addMarker(1, 'own_empty', 11.55, 45.22);
        this.addMarker(2, 'own_empty', 13.55, 45.22);
        this.addMarker(3, 'own_full', 15.55, 45.22);
        this.addMarker(4, 'full', 9.55, 45.22);
        this.addMarker(5, 'empty', 11.55, 43.22);

    }

    addMarker(bucketID, category, lon, lat) {

        const coords = ol.proj.fromLonLat([lon, lat]);

        this.features.push(new ol.Feature({
            bucketID: bucketID,
            category: category,
            geometry: new ol.geom.Point(coords)
        }));

    }

}
