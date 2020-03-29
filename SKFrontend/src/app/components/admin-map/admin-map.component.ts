import { Component, OnInit } from '@angular/core';

import {CommunicationService} from '../../services/communication.service';
import {OrchestratorService} from '../../services/orchestrator.service';
import {AdminService} from '../../services/admin.service';
import {Station} from '../../models/Station';
import {Location} from '../../models/Location';
import {Bucket} from '../../models/Bucket';
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

/*
* Component that contains an OpenLayers map for viewing and editing purposes.
*/

export class AdminMapComponent implements OnInit {

    //String used to select the current click interaction with the map
    drawMode: string = 'none';
    selectedStation: Station;
    currentStation: Station;
    selectedLocation: Location;

    constructor(private communicationService: CommunicationService,
                private orchestratorService: OrchestratorService,
                private adminService: AdminService) { }


    ngOnInit(): void {

        //Style Function to give the markers a dynamic size
        let stationStyleFunction = function(feature) {

            let station = feature.get('station');

            //Default values
            let scale = 0.07;

            //Make the marker larger if it is selected
            if(this.selectedStation == station){
                scale = 0.1;
            }
            if(this.currentStation == station){
                scale = 0;
            }

            //Create final Icon
            let style = new Style({
                image: new Icon({
                    src: '/assets/station.png',
                    imgSize: [512, 512],
                    scale: scale,
                    color: 'grey'
                })
            });

            return style;
        }.bind(this)

        //Create VectorSource outside the Layer to be able to add Features to it later on
        let stationSource = new VectorSource();

        //Create VectorLayer outside the map to be able to refresh it using stationLayer.changed()
        let stationLayer = new VectorLayer({
            source: stationSource,
            style: stationStyleFunction
        })

        //Create VectorSource outside the Layer to be able to add Features to it later on
        let stationEditSource = new VectorSource();

        //Create VectorLayer outside the map to be able to refresh it using bucketEditLayer.changed()
        let stationEditLayer = new VectorLayer({
            source: stationEditSource,
            style: new Style({
                image: new Icon({
                    src: '/assets/station.png',
                    imgSize: [512, 512],
                    scale: 0.07
                })
            })
        })


        //Style Function that colors the locations dynamically
        let locationStyleFunction = function(feature) {

            //default value
            let color = 'green';

            //show the selected location as blue
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


        //Create VectorSource outside the Layer to be able to add Features to it later on
        let locationEditSource = new VectorSource();

        //Create VectorLayer outside the map to be able to refresh it using fenceLayer.changed()
        let locationEditLayer = new VectorLayer({
            source: locationEditSource,
            style: new Style({
                stroke: new Stroke({
                    color: 'blue',
                    width: 7
                })
            })
        })


        //Style Function to give the markers a dynamic Icon that changes based on bucket values
        let bucketStyleFunction = function(feature) {

            let bucket = feature.get('bucket');

            //Base color
            let color = 'white';

            //Color the bucket based on fill status
            if(bucket.reserved){
              color = 'cyan';
            } else if(bucket.frogAmount == 0){
                color = 'lime'; //empty
            } else if(bucket.frogAmount < bucket.frogAmountMax/2) {
                color = 'yellow'; //less than 50% full
            } else if(bucket.frogAmount < bucket.frogAmountMax){
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


        //Create VectorSource outside the Layer to be able to add Features to it later on
        let bucketEditSource = new VectorSource();

        //Create VectorLayer outside the map to be able to refresh it using bucketEditLayer.changed()
        let bucketEditLayer = new VectorLayer({
            source: bucketEditSource,
            style: new Style({
                image: new Icon({
                    src: '/assets/bucket.png',
                    imgSize: [512, 512],
                    scale: 0.07
                })
            })
        })


        //Create VectorSource outside the Layer to be able to add Features to it later on
        let bucketEditInactiveSource = new VectorSource();

        //Create VectorLayer outside the map to be able to refresh it using bucketEditInactiveLayer.changed()
        let bucketEditInactiveLayer = new VectorLayer({
            source: bucketEditInactiveSource,
            style: new Style({
                image: new Icon({
                    src: '/assets/bucket.png',
                    imgSize: [512, 512],
                    scale: 0.07,
                    color: 'gray'
                })
            })
        })


        //Create the view outside the map to be able to adjust its position
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
                stationLayer,
                stationEditLayer,
                locationLayer,
                locationEditLayer,
                bucketLayer,
                bucketEditInactiveLayer,
                bucketEditLayer
            ],
            view: view
        });


        //Subscribe to the current interaction mode
        this.adminService.drawMode.subscribe( drawMode =>
            this.drawMode = drawMode
        )

        //Register a click event
        map.on('click', function(e){

            //Basic Selection Functionality
            if(this.drawMode == 'none'){

              let selectedStation = null;
              let selectedLocation = null;
              let selectedBucket = null;

              map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
                  if(layer == stationLayer){
                      selectedStation = feature.get('station');
                  }
                  if(layer == locationLayer){
                      selectedLocation = feature.get('location');
                  }
                  if(layer == bucketLayer){
                      selectedBucket = feature.get('bucket');
                  }
              }.bind(this));

              //If a station is selected, don't select anything else with it
              if(selectedStation != null){
                  selectedLocation = null;
                  selectedBucket = null;
              }

              //If a bucket is selected, don't select the location below it
              if(selectedBucket != null){
                  selectedLocation = null;
              }

              this.adminService.setSelectedStation(selectedStation);
              this.adminService.setSelectedLocation(selectedLocation);
              this.adminService.setSelectedBucket(selectedBucket);

            } else
            //Send bucket positions at the click to the adminService
            if(this.drawMode == 'bucket'){
                const coord = toLonLat(map.getCoordinateFromPixel(e.pixel));

                this.adminService.setBucketPosition({
                    longitude: coord[0],
                    latitude: coord[1]
                });

            } else
            //Send location positions at the click to the adminService
            if(this.drawMode == 'location'){
                const coord = toLonLat(map.getCoordinateFromPixel(e.pixel));

                this.adminService.pushRoutePoint({
                    longitude: coord[0],
                    latitude: coord[1]
                });

            } else
            //Send station positions at the click to the adminService
            if(this.drawMode == 'station'){
                const coord = toLonLat(map.getCoordinateFromPixel(e.pixel));

                this.adminService.setStationPosition({
                    longitude: coord[0],
                    latitude: coord[1]
                });
            }

        }.bind(this));


        // Subscribe to Stations
        this.communicationService.allstations.subscribe(stations => {

            //Parse all stations into OpenLayers features
            let features = [];
            stations.forEach(station => {

                const coords = fromLonLat([station.position.longitude, station.position.latitude]);
                features.push(new Feature({
                    station: station,
                    geometry: new Point(coords)
                }));

            });

            //Refresh buckets
            stationSource.clear();
            stationSource.addFeatures(features);
            stationLayer.changed();
        })

        //Subscription to update the selected station
        this.adminService.selectedStation.subscribe(selectedStation => {
            this.selectedStation = selectedStation;
            stationLayer.changed();

            //Jump to the currently selected station
            if(selectedStation != null){
                if(selectedStation.position.longitude != 0 || selectedStation.position.latitude != 0) {
                    view.setCenter(fromLonLat([selectedStation.position.longitude, selectedStation.position.latitude]));
                    view.setZoom(14);
                }
            }
        });

        //Subscribe to the station that is currently being edited
        this.adminService.currentStation.subscribe(station => {
            this.currentStation = station;

            //Refresh the edited location on the map
            stationEditSource.clear();
            if(station != null){
                stationEditSource.addFeature(new Feature({
                    station: station,
                    geometry: new Point(fromLonLat([station.position.longitude, station.position.latitude]))
                }));
            }
            stationEditLayer.changed();

        });


        // Subscribe to locations
        this.communicationService.alllocations.subscribe(locations => {

            //Parse all locations into OpenLayers features
            let features = [];
            locations.forEach(location => {

                const locationCoords = [];

                location.locationMarkers.forEach(point =>
                    locationCoords.push(fromLonLat([point.longitude, point.latitude]))
                );

                features.push(new Feature(({
                    location: location,
                    geometry: new LineString(locationCoords)
                })));

            });

            //Refresh locations
            locationSource.clear();
            locationSource.addFeatures(features);
            locationLayer.changed();

        });

        //Subscription to update the selected location
        this.adminService.selectedLocation.subscribe(selectedLocation => {

            this.selectedLocation = selectedLocation;

            //Jump to the currently selected location
            if(selectedLocation != null){
                if(selectedLocation.locationMarkers.length > 1) {
                    let locationCoords = [];
                    selectedLocation.locationMarkers.forEach(point =>
                        locationCoords.push(fromLonLat([point.longitude, point.latitude]))
                    );

                    let geometry = new LineString(locationCoords);

                    view.fit(geometry);
                    view.adjustZoom(-1);
                }
            }

            locationLayer.changed();
        });

        //Subscribe to the location that is currently being edited
        this.adminService.routePoints.subscribe(positions => {

            //Hide all other locations while a location is being edited
            if(positions.length == 0){
                locationLayer.setVisible(true);
            } else {
                locationLayer.setVisible(false);
            }

            //Parse the location points
            let locationCoords = [];
            positions.forEach(position =>
                locationCoords.push(fromLonLat([position.longitude, position.latitude]))
            );

            //Refresh the edited location on the map
            locationEditSource.clear();
            locationEditSource.addFeature(new Feature(({
                location: location,
                geometry: new LineString(locationCoords)
            })));

        });


        // Subscribe to buckets
        this.communicationService.allbuckets.subscribe(buckets => {

            //Parse all buckets into OpenLayers features
            let features = [];
            buckets.forEach(bucket => {

                //Create a feature that holds important information about a bucket for every bucket in the list
                const coords = fromLonLat([bucket.position.longitude, bucket.position.latitude]);
                features.push(new Feature({
                    bucket: bucket,
                    geometry: new Point(coords)
                }));

            });

            //Refresh buckets
            bucketSource.clear();
            bucketSource.addFeatures(features);
            bucketLayer.changed();
        });


        //Subscribe to the bucket that is currently being edited
        this.adminService.currentBucket.subscribe(bucket => {

            //Refresh the edited location on the map
            bucketEditSource.clear();
            if(bucket != null){
                bucketEditSource.addFeature(new Feature({
                    bucket: bucket,
                    geometry: new Point(fromLonLat([bucket.position.longitude, bucket.position.latitude]))
                }));
            }
            bucketEditLayer.changed();

        });


        //Subscribe to inactive buckets
        this.adminService.createdBuckets.subscribe(buckets => {

            //Hide all other buckets while buckets are being edited
            if(buckets.length == 0){
                bucketLayer.setVisible(true);
            } else {
                bucketLayer.setVisible(false);
            }

            //Parse all buckets into OpenLayers features
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
            bucketEditInactiveSource.clear();
            bucketEditInactiveSource.addFeatures(features);
            bucketEditInactiveLayer.changed();
        });

    }

}
