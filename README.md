# WiFi Whispers
*A sonified internet connection speed test.*

**A running instance of this project can be found at the following URL: [https://listen.2nd.systems/](https://listen.2nd.systems/)**

![a screenshot of a webpage that reads "number" secrects per second" on a dark blue background with small white dots scattered about](https://raw.githubusercontent.com/ratemypraxis/ratemypraxis.github.io/main/images/wifiWhispers.png).

## What is going on?
- An image is hosted on a secure server in NYC.
  - [This image of the Sombrero galaxy](https://en.wikipedia.org/wiki/File:M104_ngc4594_sombrero_galaxy_hi-res.jpg) to be exact.
  - The server is running via node.js with Express on a virtual machine hosted by Digital Ocean. 
- Your browser downloads this image every second, with the speed of that download being measured to estimate network strength.
  - Distance from NYC (the server location) has an affect on speed here.
- A generative melody plays on...
  - the measured speed of your connection or networked "secrets" manipulated the melody in realtime.

## What's it made of?
- p5.js
  - p5.sound
- node.js
  - express
- certbot
- digital ocean
- broadband

## Who is to thank?
- [School for Poetic Computation](sfpc.study)
  - Tommy Martinez
  - Maxine De Las Pozas
- Wikipedia
  - Contributers to [Sombrero Galaxy](https://en.wikipedia.org/wiki/Sombrero_Galaxy) article
- geeksforgeeks.com
  - romy421kumari (author of ["How to Detect Network Speed using JavaScript?"](https://www.geeksforgeeks.org/how-to-detect-network-speed-using-javascript/))
