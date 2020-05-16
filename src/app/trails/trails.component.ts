import { Component, OnInit, ViewChild } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-trails',
  templateUrl: './trails.component.html',
  styleUrls: ['./trails.component.scss']
})
export class TrailsComponent implements OnInit {
  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;

  constructor() { }

  ngOnInit(): void {

    const mapProperties = {
      center: new google.maps.LatLng(39.6024228,-105.0220082),
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    //
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

    // https://developers.google.com/maps/documentation/javascript/markers
    // Markers

    const trails = [

      ['Lair o’ the Bear Park', 39.676889, -105.259000, 8],
      ['Mount Glennon Access', 39.651444, -105.183983, 7],
      ['Hildebrand Ranch Park', 39.552527, -105.110166, 6],
      ['Green Mountain', 39.7027146,-105.1803259, 5],
      ['The Stone House', 39.6662054,-105.0929393, 4],
      ['South Valley Park', 39.5639631,-105.1536964, 3],
      ['Denver Botanic Gardens Chatfield Farms', 39.556619,-105.093151, 2],
      ['Deer Creek Canyon Trails', 39.543369,-105.152342, 1]
    ];

    for (let i = 0; i < trails.length; i++) {
      const trail = trails[i];
      // console.log('trail', trail[1]);
      const lat = Number(trail[1]);
      const long = Number(trail[2]);
      // var latlng = new google.maps.LatLng(lat, long);

      var marker = new google.maps.Marker({
        position: {lat: lat, lng: long},
        map: this.map,
        // icon: image,
        // shape: shape,
        animation: google.maps.Animation.DROP,
        title: trail[0].toString(),
        zIndex: Number(trail[3]),
      });
    }

  }

}
