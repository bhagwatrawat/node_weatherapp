const express=require('express')
const geoCoding=require('./geocoding.js')
const Forecast=require('./forecast.js')
const path=require('path')
const hbs=require('hbs')
const app=express()

const port=process.env.PORT || 3000
const viewsPath=path.join(__dirname,'../TEMPLATES/views')
const partialPath=path.join(__dirname,'../TEMPLATES/partials')
app.use(express.static(path.join(__dirname,'../public')))
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)





app.get('',(req,res)=>{
res.render('index',{
title:'Home',
about:'Welcome to home page',
Name:'Bhagwat Rawat'
})
})

app.get('/about',(req,res)=>{
res.render('about',{
title:'About',
about:'Welcome to about page',
Name:'Bhagwat Rawat'
})
})

app.get('/weather',(req,res)=>{
if(!req.query.address){
return res.send('Entry the address query')
}
geoCoding(req.query.address,(error,data)=>{
if(error){
return res.send({error})
}
Forecast(data,(error,info)=>{
if (error){
return res.send({error})
}
res.send({
temperature:'The current temperature is '+info.temperature+' C .The weather is '+info.summary+' with '+info.precipProbability+' % of raining',
place:info.place,
temperatureHigh:'MAX temperature '+info.temperatureHigh+' C',
temperatureLow:'MIN temperature '+info.temperatureLow+' C'
})
})
})


})

app.get('*',(req,res)=>{
res.render('error',{
title:'Home',
error:'error 404 page not found'
})
})

app.get('about/*',(req,res)=>{
res.render('error',{
title:'About',
error:'info not available'
})
})

app.listen(port)