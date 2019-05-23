export function load_google_maps() {
  return new Promise(function(resolve, reject) {
    //
    window.resolveGoogleMapsPromise = function() {
      //
      resolve(window.google)
      //
      delete window.resolveGoogleMapsPromise
    }
    //
    const script = document.createElement('script')
    const API_KEY = 'AIzaSyC1qO6hXPMRMb18lzakAa7ALghBm8F76q0'
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=resolveGoogleMapsPromise`
    script.async = true
    script.onerror = () => reject({ error: true })
    document.body.appendChild(script)
  })
}

export function fetchPlaces() {
  const CLIENT_ID = 'VMPTEKQG51PESGKZCI2WF2DARMIHLUYTEKOV0RFICCQ0MKZ3'
  const SECRET = 'UETJ1VXRWCS2IN4SN5SMTYTDM212ST5ORUUXAMJLKBE1FRTL'
  return fetch(
    `https://api.foursquare.com/v2/venues/search?client_id=${CLIENT_ID}&client_secret=${SECRET}&v=20180323&near=Osasco SP`
  )
    .then(response => response.json())
    .then(data => data)
    .catch(erro => alert(erro))
}
