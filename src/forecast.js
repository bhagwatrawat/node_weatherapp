const request =require('request')
const Forecast=(data,callback)=>{const url = 'https://api.darksky.net/forecast/9ddcf031e05188d41c32b089f6b26816/'+data.latitude+','+data.longitude+'?units=si'
request({url:url,json:true},(error,response)=>{

const{body}=response
const info= {
place:data.placeName,
temperature:body.currently.temperature ,
 precipProbability:body.currently.precipProbability
 }

 callback(info)
})
}
module.exports=Forecast