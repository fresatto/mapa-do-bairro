import React, { Component } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Lista from './components/Lista'
import './App.scss'

import { load_google_maps, fetchPlaces } from './utils'

class App extends Component {
  state = {
    query: '',
    locations: [],
  }

  componentDidMount() {
    let googleMapsPromise = load_google_maps()
    let placesPromise = fetchPlaces()

    Promise.all([googleMapsPromise, placesPromise]).then(values => {
      let google = values[0]
      let places = values[1].response.venues

      this.google = google
      this.places = places

      // Cria o mapa
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -23.5475531, lng: -46.7568715 },
        zoom: 14,
        scrollwheel: true,
      })

      // Cria um array de marcadores
      this.markers = []

      // Cria uma instancia de bounds
      this.bounds = new google.maps.LatLngBounds()

      // Infowindow
      this.infoWindow = new google.maps.InfoWindow()

      // Pra cada localização no state, cria um marcador
      this.places.forEach(place => {
        let marker = new google.maps.Marker({
          position: { lat: place.location.lat, lng: place.location.lng },
          map: this.map,
          title: place.name,
          id: place.id,
        })

        marker.addListener('click', () => marker.setAnimation(1))

        this.bounds.extend({
          lat: place.location.lat,
          lng: place.location.lng,
        })

        this.markers.push(marker)
      })

      // Seta o bound no mapa
      this.map.fitBounds(this.bounds)
      console.log(this.places)
      // Seta as locações no estado
      this.setState({
        locations: this.places,
        locationsFiltered: this.places,
      })
    })
  }

  HandlerClick = location => {
    this.markers.forEach(marker => {
      if (marker.id !== location.id) {
        if (marker.animation !== null) marker.setAnimation(null)
      }

      if (marker.id === location.id) {
        this.infoWindow.open(this.map, marker)
        this.infoWindow.setContent(`
          <h3 class="info-window-ttl">${location.name}</h3>
          <h4 class="info-window-sub">${
            location.categories[0].name
              ? location.categories[0].name
              : 'Sem categoria'
          }</h4>
          <address class="info-window-addr">${
            location.location.address
              ? location.location.address
              : 'Nenhum endereço fornecido'
          }</address>

        `)
        console.log('MARCADOR: ', marker)
        this.map.setCenter(marker.position)
        this.map.setZoom(18)
        marker.setAnimation(1)
      }
    })
    // let marker = this.markers.filter(marker => location.id === marker.id)[0]
  }

  HandleFilter = query => {
    this.markers.forEach(marker => {
      marker.title.toLowerCase().includes(query.toLowerCase())
        ? marker.setVisible(true)
        : marker.setVisible(false)
    })

    const locationsFiltered = [...this.state.locations].filter(location =>
      location.name.toLocaleLowerCase().includes(query.toLowerCase())
    )
    this.setState({
      query: query,
      locationsFiltered: locationsFiltered,
    })
  }

  render() {
    return (
      <section className="container-fluid">
        <section className="row">
          <article className="col-md-3 p-0">
            <Lista
              locationsFiltered={
                this.state.locationsFiltered ? this.state.locationsFiltered : []
              }
              itemClick={this.HandlerClick}
              handleFilter={this.HandleFilter}
              query={this.state.query}
            />
          </article>
          <article className="col-md-9 p-0">
            <div id="map" style={{ height: '100vh' }} />
          </article>
        </section>
      </section>
    )
  }
}

export default App
