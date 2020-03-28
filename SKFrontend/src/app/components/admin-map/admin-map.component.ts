import { Component, OnInit } from '@angular/core';

import {CommunicationService} from '../../services/communication.service';
import {OrchestratorService} from '../../services/orchestrator.service';
import {AdminService} from '../../services/admin.service';
import {Location} from '../../models/Location';
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

    drawMode = 'none';
    selectedLocation: Location;

    constructor(private communicationService: CommunicationService,
                private orchestratorService: OrchestratorService,
                private adminService: AdminService) { }


    ngOnInit(): void {

      // Style Function to give that colors the locations dynamically
      const locationStyleFunction = function(feature) {

          // default value
          let color = 'green';

          if (feature.get('location') == this.selectedLocation) {
              color = 'blue';
          }

          const style = new Style({
              stroke: new Stroke({
                  color,
                  width: 7
              })
          });

          return style;
      }.bind(this);

        // Create VectorSource outside the Layer to be able to add Features to it later on
      const locationSource = new VectorSource();

        // Create VectorLayer outside the map to be able to refresh it using fenceLayer.changed()
      const locationLayer = new VectorLayer({
            source: locationSource,
            style: locationStyleFunction
        });


          // Create VectorSource outside the Layer to be able to add Features to it later on
      const locationEditSource = new VectorSource();

          // Create VectorLayer outside the map to be able to refresh it using fenceLayer.changed()
      const locationEditLayer = new VectorLayer({
              source: locationEditSource,
              style: new Style({
                  stroke: new Stroke({
                      color: 'blue',
                      width: 7
                  })
              })
          });



        // Style Function to give the markers a dynamic Icon that changes base on bucket values
      const bucketStyleFunction = function(feature) {

            const bucket = feature.get('bucket');

            let color = 'white';

            // Color the bucket based on fill status
            if (bucket.reserved) {
              color = 'cyan';
            } else if (bucket.currentFrogs == 0) {
                color = 'lime'; // empty
            } else if (bucket.currentFrogs < bucket.maxFrogs / 2) {
                color = 'yellow'; // less than 50% full
            } else if (bucket.currentFrogs < bucket.maxFrogs) {
                color = 'orange'; // more than 50% full
            } else {
                color = 'red'; // full
            }

            // Create final Icon
            const style = new Style({
                image: new Icon({
                    src: '/assets/bucket.png',
                    imgSize: [512, 512],
                    scale: 0.07,
                    color
                })
            });

            return style;
        }.bind(this);

        // Create VectorSource outside the Layer to be able to add Features to it later on
      const bucketSource = new VectorSource();

        // Create VectorLayer outside the map to be able to refresh it using bucketLayer.changed()
      const bucketLayer = new VectorLayer({
            source: bucketSource,
            style: bucketStyleFunction
        });

      const bucketEditSource = new VectorSource();

      const bucketEditLayer = new VectorLayer({
            source: bucketEditSource,
            style: new Style({
                image: new Icon({
                    src: '/assets/bucket.png',
                    imgSize: [512, 512],
                    scale: 0.07
                })
            })
        });

      const bucketEditInactiveSource = new VectorSource();

      const bucketEditInactiveLayer = new VectorLayer({
            source: bucketEditInactiveSource,
            style: new Style({
                image: new Icon({
                    src: '/assets/bucket.png',
                    imgSize: [512, 512],
                    scale: 0.07,
                    color: 'gray'
                })
            })
        });


      const view = new View({
            center: fromLonLat([10.4515, 51.1657]),
            zoom: 6.3
        });


        // Create map
      const map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OsmSource()
                }),
                locationLayer,
                locationEditLayer,
                bucketLayer,
                bucketEditInactiveLayer,
                bucketEditLayer
            ],
            view
        });

      this.adminService.drawMode.subscribe( drawMode =>
            this.drawMode = drawMode
        );

        // Register a click event
      map.on('click', function(e) {


            if (this.drawMode == 'none') {

              let selectedLocation = null;
              let selectedBucket = null;

              map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
                  if (layer == locationLayer) {
                      selectedLocation = feature.get('location');
                  }
                  if (layer == bucketLayer) {
                      selectedBucket = feature.get('bucket');
                  }
              }.bind(this));

              // If a bucket is selected, don't select the location below it
              if (selectedBucket != null) {
                  selectedLocation = null;
              }

              this.adminService.setSelectedLocation(selectedLocation);
              this.adminService.setSelectedBucket(selectedBucket);

            } else
            if (this.drawMode == 'bucket') {
                const coord = toLonLat(map.getCoordinateFromPixel(e.pixel));

                this.adminService.setBucketPosition({
                    longitude: coord[0],
                    latitude: coord[1]
                });
            } else
            if (this.drawMode == 'location') {
              const coord = toLonLat(map.getCoordinateFromPixel(e.pixel));

              this.adminService.pushRoutePoint({
                  longitude: coord[0],
                  latitude: coord[1]
              });
            } else
            if (this.drawMode == 'station') {


            }

        }.bind(this));


        // Subscribe to locations
      this.communicationService.alllocations.subscribe(locations => {

            const features = [];
            locations.forEach(location => {

                const locationCoords = [];

                location.locationMarkers.forEach(point =>
                    locationCoords.push(fromLonLat([point.longitude, point.latitude]))
                );

                features.push(new Feature(({
                    location,
                    geometry: new LineString(locationCoords)
                })));

            });

            locationSource.addFeatures(features);
            locationLayer.changed();

        });


        // Subscribe to buckets
      this.communicationService.allbuckets.subscribe(buckets => {

            const features = [];
            buckets.forEach(bucket => {

                // Create a feature that holds important information about a bucket for every bucket in the list
                const coords = fromLonLat([bucket.position.longitude, bucket.position.latitude]);
                features.push(new Feature({
                    bucket,
                    geometry: new Point(coords)
                }));

            });

            // Update VectorSource

            bucketSource.addFeatures(features);
        });


        // Subscribe to the bucket that is currently being created
      this.adminService.currentBucket.subscribe(bucket => {

            bucketEditSource.clear();

            if (bucket != null) {
              // Update VectorSource
              bucketEditSource.addFeature(new Feature({
                  bucket,
                  geometry: new Point(fromLonLat([bucket.position.longitude, bucket.position.latitude]))
              }));
            }


        });


        // Subscribe to inactive buckets
      this.adminService.createdBuckets.subscribe(buckets => {

            if (buckets.length == 0) {
                bucketLayer.setVisible(true);
            } else {
                bucketLayer.setVisible(false);
            }

            const features = [];
            buckets.forEach(bucket => {

                // Create a feature that holds important information about a bucket for every bucket in the list
                const coords = fromLonLat([bucket.position.longitude, bucket.position.latitude]);
                features.push(new Feature({
                    bucket,
                    geometry: new Point(coords)
                }));

            });

            // Update VectorSource
            bucketEditInactiveSource.clear();
            bucketEditInactiveSource.addFeatures(features);
        });

        // Subscribe to currently edited Location
      this.adminService.routePoints.subscribe(positions => {

            if (positions.length == 0) {
                locationLayer.setVisible(true);
            } else {
                locationLayer.setVisible(false);
            }

            const locationCoords = [];

            positions.forEach(position =>
                locationCoords.push(fromLonLat([position.longitude, position.latitude]))
            );

            locationEditSource.clear();

            locationEditSource.addFeature(new Feature(({
                location,
                geometry: new LineString(locationCoords)
            })));

        });


        // Subscription to update the selected location
      this.adminService.selectedLocation.subscribe(selectedLocation => {

            this.selectedLocation = selectedLocation;

            // Jump to the currently selected location
            if (selectedLocation != null) {

                const locationCoords = [];
                selectedLocation.locationMarkers.forEach(point =>
                    locationCoords.push(fromLonLat([point.longitude, point.latitude]))
                );

                const geometry = new LineString(locationCoords);

                view.fit(geometry);
                view.adjustZoom(-1);
            }

            locationLayer.changed();
        });

    }

}
