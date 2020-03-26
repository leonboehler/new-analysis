import { Component, OnInit } from '@angular/core';

import {CommunicationService} from '../../services/communication.service'
import {OrchestratorService} from '../../services/orchestrator.service'
import {AdminService} from '../../services/admin.service'
import {Subscription} from 'rxjs';

import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import OsmSource from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {Icon, Stroke, Style} from 'ol/style';
import {fromLonLat, toLonLat} from 'ol/proj';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';


@Component({
    selector: 'app-admin-map',
    templateUrl: './admin-map.component.html',
    styleUrls: ['./admin-map.component.css']
})
export class AdminMapComponent implements OnInit {

    currentlyEditing: boolean = false;

    constructor(private communicationService: CommunicationService,
                private orchestratorService: OrchestratorService,
                private adminService: AdminService) { }


    ngOnInit(): void {

        //Style Function to give that colors the locations dynamically
        let locationStyleFunction = function(feature) {

            let style = new Style({
                stroke: new Stroke({
                    color: 'green',
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

            let color = 'white';

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
                    scale: 0.07,
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

        let selectLocationStyle = new Style({
            stroke: new Stroke({
                color: 'cyan',
                width: 7
            })
        })

        let selectBucketStyle = new Style({
            image: new Icon({
                src: '/assets/bucket.png',
                imgSize: [512, 512],
                scale: 0.07
            })
        })

        let selectSource = new VectorSource();

        let selectLayer = new VectorLayer({
            source: selectSource,
            style: selectBucketStyle
        })

        let selectInactiveSource = new VectorSource();

        let selectInactiveLayer = new VectorLayer({
            source: selectInactiveSource,
            style: new Style({
                image: new Icon({
                    src: '/assets/bucket.png',
                    imgSize: [512, 512],
                    scale: 0.07,
                    color: 'gray'
                })
            })
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
                bucketLayer,
                selectInactiveLayer,
                selectLayer
            ],
            view: view
        });

        let drawMode = 'bucket';

        //Register a click event
        map.on('click', function(e){

            if(drawMode == 'bucket'){
                const coord = toLonLat(map.getCoordinateFromPixel(e.pixel));

                this.adminService.setBucketPosition({
                    longitude: coord[0],
                    latitude: coord[1]
                });
                console.log(coord);
            } else
            if(drawMode == 'location'){


            }

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


        //Subscribe to buckets
        this.communicationService.buckets().subscribe(buckets => {

            if(!this.currentlyEditing){
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
            }
        });


        //Subscribe to the bucket that is currently being created
        this.adminService.currentBucket.subscribe(bucket => {

            selectSource.clear();

            if(bucket != null){
              //Update VectorSource
              selectSource.addFeature(new Feature({
                  bucket: bucket,
                  geometry: new Point(fromLonLat([bucket.position.longitude, bucket.position.latitude]))
              }));
            }


        });


        //Subscribe to inactive buckets
        this.adminService.createdBuckets.subscribe(buckets => {

            if(buckets.length == 0){
                this.currentlyEditing = false;
            } else {
                this.currentlyEditing = true;
            }

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
            selectInactiveSource.clear();
            selectInactiveSource.addFeatures(features);
        });

    }

}
