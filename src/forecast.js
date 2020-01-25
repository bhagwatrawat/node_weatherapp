const request =require('request')
const Forecast=(data,callback)=>{const url = 'https://api.darksky.net/forecast/9ddcf031e05188d41c32b089f6b26816/'+data.latitude+','+data.longitude+'?units=si'
request({url:url,json:true},(error,response)=>{
if(error){
callback('unable to connect',undefined)
}
else if (response.body.error){
callback(response.body.error,undefined)
}
else{
const{body}=response
const info= {
place:data.placeName,
temperature:body.currently.temperature ,
 precipProbability:body.currently.precipProbability,
 summary:body.currently.summary,
 temperatureHigh:body.daily.data[0].temperatureHigh,
 temperatureLow:body.daily.data[0].temperatureLow
 }

 callback(undefined,info)
}
})
}
module.exports=Forecast