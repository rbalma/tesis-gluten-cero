const Market = require('../models/market');

// @ desc Get all Markets
// @ route GET /api/v1/map/markets
// @ access public
exports.getMarkets = async (req, res) => {
    try {
        const markets = await Market.find();
        return res.json({ ok: true, markets, count: markets.length })        
    } catch (error) {
        console.err(error.message);
        res.status(500).json({ ok: false, error: 'Server error' });
    }
}


exports.getMarketById = (req, res) => {
    
}

exports.getPictureMarket = (req, res) => {
    
}


// @ desc Create a market
// @ route POST /api/v1/markets
// @ access privade
exports.addMarket = async (req, res) => {
    const { name, direction, type, longitude, latitude } = req.body;
    const lng = parseFloat(longitude);
    const lat = parseFloat(latitude);

    try {
        if (!name || !direction || !type ) 
          return res.status(401).json({ ok: false, message: "Todos los campos son obligatorios" });

        if (!req.file ) 
          return res.status(401).json({ ok: false, message: "Debe subir una foto" });

        const location = { type: 'Point', coordinates: [ lng, lat ] };
        
        const newMarket = {
            ...req.body,
            user: req.user.id,
            type: parseInt(type),
            imgUrl: `/api/v1/markets-picture/${req.file.filename}`,
            image: req.file.filename,
            location: location
        }      
       
        const marketDB = await Market.create( newMarket );
    
        if (!marketDB) 
          return res.status(400).json({ ok: false, message: "No se puedo crear el marcador" });
        
          res.json({ ok: true, market: marketDB, message: 'Marcador creado' });

      } catch (error) {
        console.error(error.message);
        res.status(500).json({ ok: false,
          message: "Hable con el administrador",
        });
      }
} 


exports.findMarkets = async (req, res) => {
    let { lng, lat, mts } = req.query;

    lng = parseFloat(lng);
    lat = parseFloat(lat);
    mts = parseInt(mts);

    try {

        const markets = await Market.find( { location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [ lng, lat ]
                },
                $maxDistance: mts
            }
        } } );

        res.json({ ok: true, markets })

        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ ok: false,
          message: "Hable con el administrador",
        });
    }

}

