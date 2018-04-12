import { Component,OnInit,NgZone } from '@angular/core';
import { MatDialog,MatDialogRef} from '@angular/material';
import {DialogDataDialog} from './dialog/dialog.component';
import { HotelInfo } from './HotelClass';
import { debug } from 'util';

declare var google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  hotlMarkerInfo : HotelInfo = new HotelInfo();
  public map;
  constructor(public dialog: MatDialog,private ngZone: NgZone) {}

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(20.5937, 78.9629),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
      this.map = new google.maps.Map(document.getElementById("gmap"), mapProp);

      this.map.addListener('dblclick',(e) => {
        this.ngZone.run(() => this.openDialog(e.latLng));
      });

      var centerControlDiv = document.createElement('div');
      var centerControl = this.CategoryControl(centerControlDiv, this.map);

        //centerControlDiv.index = 1;
        this.map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(centerControlDiv);
  }

  CategoryControl(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'black';
    controlUI.style.border = '2px solid black';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlUI.style.opacity = '0.8';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'white';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = '<div><b>Hotel Categories : </b><br/><img src="http://maps.google.com/mapfiles/ms/icons/green-dot.png"><label> : Resports</label><br/><img src="http://maps.google.com/mapfiles/ms/icons/red-dot.png"><label> : Luxuries Hotel</label></div>';
    controlUI.appendChild(controlText);
  }

  openDialog(latlng){
    let dialogRef = this.dialog.open(DialogDataDialog, {
      height: '400px',
      width: '400px',
    });
    
    dialogRef.afterClosed().subscribe(result => {
        if(result != 'Cancel'){
          this.hotlMarkerInfo.name = result.name;
          this.hotlMarkerInfo.description = result.description;
          this.hotlMarkerInfo.category = result.category;
          this.AddMarker(latlng);
        }
    });
  }

  AddMarker(latlng){
    var marker = new google.maps.Marker({
      position : latlng,
      map: this.map,
      title : this.hotlMarkerInfo.name,
      icon : this.hotlMarkerInfo.category == "1" ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png" : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    });
    
    var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h3 id="firstHeading" class="firstHeading">'+this.hotlMarkerInfo.name+'</h3>'+
    '<div id="bodyContent">'+
    '<hr/>' +
    '<p><b>Description : </b> '+ this.hotlMarkerInfo.description
    '</p></div></div>';
  
    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth : 400
    });
  
    marker.addListener('click', (e) => {
       infowindow.open(this.map, marker);
     });
  }
  
}
