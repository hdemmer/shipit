
var SAILORS = ["img/person_fisherman.png","img/person_fisherman2.png","img/person_fisherman3.png"];

function drawBoats()
{
    for (var sense = 7; sense>0;sense--)
    {
        for (var boatI = 0; boatI < activeBoats.length;boatI++)
        {
       
            var boat = activeBoats[boatI];
            var config = boat.config;
            
            if(sense == config.sensors)
            {
                var sailorCount = 0;
                var drawnSailorCount = 0;
                
                //titanics
                //pirate
                //tug
                //fish
                //barrel
                //rowboat
                //tube
                
                
                
                //Draw main boat
                var x = boat.x;
                for (var pi = 0; pi<config.parts.length; pi++)
                {
                    var y = boat.y;
        
                    var part = config.parts[pi];
                    var delay = part.delay;
                    if (delay > 0)
                    {
                        y = boat.yHist[delay];
                    }
                    y+=config.offset;
                    
                    
                    if (part.sailors)
                    {
                        for(var slr = 0; slr<part.sailors.length; slr++)
                        {
                            if ( boat.sailors.indexOf(sailorCount) != -1) {
                                var slrx = x - config.width / 2 + part.sailors[slr].x;
                                var slry = boat.yHist[delay+1] + part.sailors[slr].y;

                                var sailorSprite = SAILORS[boat.sailorSprites[drawnSailorCount]];
                                drawSprite(sailorSprite, slrx, slry);
                                drawnSailorCount++;
                            }
                            sailorCount++;
                        }
                    }
                    drawSprite(part.img, x, y);
                    
                }
            }
        }
    }
}

