const request =require('request')
const geoCoding=(place,callback)=>{
const url1='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(place)+'.json?access_token=pk.eyJ1IjoiYmhhZ3dhdHJhd2F0IiwiYSI6ImNrNWt4cjd6cjA3OWkzbWp6aTRrZGNhbnIifQ.9YfSXFkbUyv1LiPetCIGCQ&limit=1'
request({url:url1,json:true},(error,response)=>{
const {body}=response
if(error){
console.log('unable to connect')
}
else if(body.message)
console.log('unable to find the coordinates')
else{
const data={ longitude: body.features[0].geometry.coordinates[0]
,  latitude: body.features[0].geometry.coordinates[1],
placeName:body.features[0].place_name
}
callback(data)
}

})
}
module.exports=geoCoding