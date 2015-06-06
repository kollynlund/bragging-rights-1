angular.module('test',['firebase'])

.controller('testControl', function($scope, Data) {
	var data = {"Events":[{"Discipline": "MTB", "City": "West Valley, Utah", "Name": "Gavin Godfrey ", "Country": "USA", "Longitude": "-112.038229", "Trick": "Triple Backflip", "Latitude": "40.724361", "Video": "https://www.youtube.com/watch?v=mvpMyZCLAIA&list=PLjSBfw0JcL39WyflvoLETpretj49yP2yZ&index=2", "Pictures": "", "Date": "7/1/2014", "Additional Information": "Build ramp himself. Attempted the trick at the same time as his two cousins. Ethen Roberts landed the same trick an hour later. "},{"Discipline": "MTB", "City": "", "Name": "Ethen Roberts", "Country": "Europe", "Longitude": "", "Trick": "Scorpion Double Backflip", "Latitude": "", "Video": "https://www.youtube.com/watch?v=oy0R5J-ArvA", "Pictures": "", "Date": "2013", "Additional Information": "Did the trick in a Nitro Circus Live show. "},{"Discipline": "MOTO", "City": "Annapolis, Maryland", "Name": "Travis Pastrana", "Country": "USA", "Longitude": "-76.6230123", "Trick": "Double Backflip", "Latitude": "38.9455277", "Video": "https://www.youtube.com/watch?v=TFpzRu7WN7s", "Pictures": "", "Date": "2006", "Additional Information": "Built the jump in his backyard. Landed the trick in the X-Games a year later. After landing it in the X-Games, he said he would never try this trick again. "},{"Discipline": "SK8", "City": "San Francisco", "Name": "Tony Hawk", "Country": "USA", "Longitude": "-122.3989762", "Trick": "First 900 on a skateboard.", "Latitude": "37.7406995", "Video": "https://www.youtube.com/watch?v=4YYTNkAdDD8", "Pictures": "http://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Skater_Tony_Hawk.jpg/640px-Skater_Tony_Hawk.jpg, http://www.gallerykeoki.com/images/KeokiItem/RippeysBackflipU.jpg", "Date": "7/27/1999", "Additional Information": "in x-games best trick"},{"Discipline": "SURF", "City": "Jaws Peahi, Hawaii", "Name": "Jeff Rowley", "Country": "USA", "Longitude": "-156.2972609", "Trick": "First Australian to paddle into a 50-foot wave (15 meters)", "Latitude": "20.9478284", "Video": "https://www.youtube.com/watch?v=nOIzWu7nFpY", "Pictures": "", "Date": "2011", "Additional Information": "Achieved his 'Charge for Charity' mission set for 2011, to raise money for Breast Cancer Australia."},{"Discipline": "SURF", "City": "Half Moon Bay, California", "Name": "Jeff Rowley", "Country": "USA", "Longitude": "-122.5035611", "Trick": "First Australian to surf Mavricks left", "Latitude": "37.4940431", "Video": "https://www.youtube.com/watch?v=Fq_EEQZOUNo", "Pictures": "", "Date": "3/12/2012", "Additional Information": "Mavericks is traditionally known as a right-hander wave and Rowley pushed the boundaries of what was possible at the Mavericks Left hander, a task that wasn't without its challenges, requiring a vertical drop into the wave."},{"Discipline": "SNOWMOBILE", "City": "Big Cottonwood Canyon, Utah", "Name": "Jim Rippey", "Country": "USA", "Longitude": "-111.6132982", "Trick": "First Backflip", "Latitude": "40.6050756", "Video": "https://www.youtube.com/watch?v=AeaIAmm38UU", "Pictures": "http://www.gallerykeoki.com/images/KeokiItem/RippeysBackflipU.jpg", "Date": "2001", "Additional Information": "Jim won the ESPN \u201cFeat of the Year\u201d for landing this trick. "},{"Discipline": "SURF", "City": "Half Moon Bay, California", "Name": "Jeff Clark", "Country": "USA", "Longitude": "-122.5035611", "Trick": "First to surf Mavericks", "Latitude": "37.4940431", "Video": "", "Pictures": "", "Date": "1975", "Additional Information": "Jeff Clark had grown up in Half Moon Bay, watching Mavericks from Half Moon Bay High School and Pillar Point. At that time the location was thought too dangerous to surf. He conceived the possibility of riding Hawaii-sized waves in Northern California. In 1975 at age 17 and with the waves topping out at 20\u201324 feet (6.1\u20137.3 m), Clark paddled out alone to face the break. He caught multiple left-breaking waves, thereby becoming the first documented person to tackle Mavericks head-on.\nOther than a few of Clark's friends who had paddled out and saw Mavericks themselves, no big wave surfers believed in its existence. Popular opinion held that there simply were no large waves in California"},{"Discipline": "SURF", "City": "three miles east of P\u0101\u02bbia, Hawaii ", "Name": "The Strapped Crew", "Country": "USA", "Longitude": "-156.4574594", "Trick": "30-foot (9.1 m) jumps on sailboards, then mating the boards to paragliders.", "Latitude": "20.9291691", "Video": "", "Pictures": "", "Date": "1990's", "Additional Information": "They were dubbed the \"Strapped Crew\" because their feet were strapped to their boards. They pushed the boundaries of surfing at Jaws surf break off the north central coast of Maui. The Strapped Crew tackled bigger waves featuring stunts"},{"Discipline": "SNOWMOBILE", "City": "Aspen, Colorado", "Name": "Levi Lavelle", "Country": "USA", "Longitude": "-106.8581394", "Trick": "First Double Backflip attempt on a snowmobile", "Latitude": "39.2009092", "Video": "https://www.youtube.com/watch?v=CfPNZx3FgLw", "Pictures": "", "Date": "", "Additional Information": "Crashed trying in this trick in the Xgames. This trick has never been landed. "},{"Discipline": "MOTO", "City": "West Valley, Utah", "Name": "Jim Dechamp", "Country": "USA", "Longitude": "-112.038229", "Trick": "First Frontflip", "Latitude": "40.724361", "Video": "https://www.youtube.com/watch?v=Ux0meWv44aI", "Pictures": "", "Date": "fall 2008", "Additional Information": "crash in x-games attempting it. broke his back"},{"Discipline": "SNOWMOBILE", "City": "Aspen, Colorado", "Name": "Heath Frisby", "Country": "USA", "Longitude": "-106.8581394", "Trick": "First Fronflip", "Latitude": "39.2009092", "Video": "https://www.youtube.com/watch?v=mUc7DDjC1II", "Pictures": "", "Date": "1/28/2012", "Additional Information": "Landed during the X-Games contest."},{"Discipline": "BASE", "City": "", "Name": "Felix Baumgartner", "Country": "OUTERSPACE", "Longitude": "", "Trick": "First to basejump from outerspace", "Latitude": "", "Video": "https://www.youtube.com/watch?v=FHtvDA0W34I", "Pictures": "", "Date": "10/1/2012", "Additional Information": "For Red Bull. He is an expert parachutist best known for completing an unprecedented freefall flight across the English Channel using a carbon wing. Grew up in Salzburg, Austria where he dreamed of skydiving and flying helicopters and was inspired by astronauts on TV. He made his first skydive at age 16."},{"Discipline": "BASE", "City": "Rio de Janiero", "Name": "Felix Baumgartner", "Country": "Brazil", "Longitude": "-43.210487", "Trick": "Lowest Base Jump", "Latitude": "-22.951916", "Video": "https://www.youtube.com/watch?v=b-PsviSStA8", "Pictures": "", "Date": "12/7/1999", "Additional Information": "Jumped off the Christ the Redeemer statue."},{"Discipline": "BASE", "City": "Kuala Lumpur", "Name": "Felix Baumgartner", "Country": "Malaysia", "Longitude": "101.7116", "Trick": "Highest parachute jump from a building", "Latitude": "3.1579", "Video": "https://www.youtube.com/watch?x-yt-cl=85027636&x-yt-ts=1422503916&v=v4imXqCkNLc ", "Pictures": "", "Date": "4/15/1999", "Additional Information": "At 1,479 feet, the Pertonas towers are the highest buildings in the world. Felix snuck into the building as a disguised businessman, carrying his parachute in a briefcase."},{"Discipline": "BASE", "City": "", "Name": "Felix Baumgartner", "Country": "England", "Longitude": "-2.3256601", "Trick": "First person in the world to fly across the English Channel wearing carbon fiber wings", "Latitude": "50.8726342", "Video": "https://www.youtube.com/watch?v=JAVITgDEpe8&x-yt-cl=85027636&x-yt-ts=1422503916", "Pictures": "", "Date": "7/31/2003", "Additional Information": "He was airborne for a little over six minutes."},{"Discipline": "SNOWMOBILE", "City": "San Diego, CA", "Name": "Levi Lavaelle", "Country": "USA", "Longitude": "-117.2162262", "Trick": "Farthest jump. 412 ft", "Latitude": "32.7055008", "Video": "https://www.youtube.com/watch?v=DexDu4FDEWM", "Pictures": "", "Date": "1/1/2013", "Additional Information": "For Reb Bull No Limits New Years Eve Event. Did it in a place that never sees snow."},{"Discipline": "RALLY", "City": "Long Beach, CA", "Name": "Travis Pastrana", "Country": "USA", "Longitude": "-118.1801421", "Trick": "Farthest jump. 269 ft", "Latitude": "33.7865792", "Video": "https://www.youtube.com/watch?v=L5N7R9Wbe_E", "Pictures": "", "Date": "12/31/2009", "Additional Information": "For Red Bull. On New Year's Eve, action sports icon Travis Pastrana, 26, made history, launching his Subaru Impreza STI rally car off the Pine Avenue Pier in Long Beach at 91 miles per hour, soaring 269 feet over Rainbow Harbor and successfully landing on a floating barge"},{"Discipline": "SK8", "City": "", "Name": "Danny Way", "Country": "USA", "Longitude": "", "Trick": "Longest jump. 79 ft", "Latitude": "", "Video": "https://www.youtube.com/watch?v=XNYpV7wtGJ8", "Pictures": "", "Date": "2004", "Additional Information": ""},{"Discipline": "SK8", "City": "", "Name": "", "Country": "", "Longitude": "", "Trick": "highest air", "Latitude": "", "Video": "", "Pictures": "", "Date": "", "Additional Information": ""},{"Discipline": "MOTO", "City": "Royal City, Washington", "Name": "Alex Harvill", "Country": "USA", "Longitude": "-119.6290429", "Trick": "Farthest Jump. 425 feet", "Latitude": "46.905206", "Video": "https://www.youtube.com/watch?v=9wUk45XzeQ4", "Pictures": "", "Date": "5/12/2012", "Additional Information": "Alex Harvill blasted past Robbie Maddison's 392-foot motocross distance jump record and Ryan Capes' previous 391-foot mark -- as well as snowmobile rider Levi LaVallee's 412-foot record -- while filming "},{"Discipline": "MTB", "City": "Virgin, Utah", "Name": "Cam Zink", "Country": "USA", "Longitude": "-113.1785302", "Trick": "Biggest Backflip drop. 78ft", "Latitude": "37.1630183", "Video": "https://www.youtube.com/watch?v=KnLGB7rqOis", "Pictures": "", "Date": "10/16/2013", "Additional Information": "Won best trick for this stunt during the Red Bull Rampage Competition."},{"Discipline": "MTB", "City": "Mammoth, CA", "Name": "Cam Zink", "Country": "USA", "Longitude": "-119.0444065", "Trick": "Farthest Backflip gap. 100ft", "Latitude": "37.6479398", "Video": "https://www.youtube.com/watch?v=yHg9Q7LMHbo", "Pictures": "", "Date": "8/21/2014", "Additional Information": "The successful record bid saw Cam hit a speed of 46 miles per hour, before launching off a 15-foot high ramp"},{"Discipline": "BMX", "City": "Taupo", "Name": "Jed Mildon", "Country": "New Zealand", "Longitude": "176.0826919", "Trick": "First Triple Backflip", "Latitude": "-38.6817534", "Video": "https://www.youtube.com/watch?v=IrCIIqn6uhM", "Pictures": "", "Date": "5/28/2011", "Additional Information": "Landed with trick in his hometown."},{"Discipline": "BMX", "City": "New York, Central Park", "Name": "Kevin Robinson", "Country": "USA", "Longitude": "-73.965355", "Trick": "Highest air. 27 feet", "Latitude": "40.782865", "Video": "http://www.redbull.com/us/en/bike/stories/1331574771744/kevin-robinson-breaks-bmx-high-air-world-record", "Pictures": "", "Date": "6/12/2008", "Additional Information": "Used to be Matt Hoffman. Built ramp himself in 1992"},{"Discipline": "BMX", "City": "Boonah, Queensland", "Name": "Dane Searls", "Country": "Australia", "Longitude": "152.6842604", "Trick": "Farthest jump. dirt to dirt. 60 ft (18 metres)", "Latitude": "-27.9914804", "Video": "https://www.youtube.com/watch?v=8aSpdpOdPeg", "Pictures": "", "Date": "11/1/2011", "Additional Information": "Two days after fulfilling his dream, Dane was involved in an accident and suffered critical head injuries, placing him in a coma for five days. Dane passed away on November 25, 2011 in hospital due to injuries sustained."},{"Discipline": "BMX", "City": "Raleigh, North Carolina", "Name": "Dave Mirra", "Country": "USA", "Longitude": "-78.6450559", "Trick": "First Double Backflip", "Latitude": "35.843768", "Video": "https://www.youtube.com/watch?v=PbE--tUvA84", "Pictures": "", "Date": "5/7/2000", "Additional Information": "The box jump at Utopia is six-feet tall and 14\u2032 long, so this was definitely the place to get it done. Dave jumped the box backwards, went all the way to the top of the 20\u2032 vert wall to get speed, and then let the double-flip fly. Dave had tried two other double-flips this weekend and came pretty close, and this one couldn\u2019t have been any better. When he landed, Dave dodged a few people and then tried a flair on an eight-foot quarter."},{"Discipline": "SCOOTER", "City": "Morewell, Victoria", "Name": "Ryan Williams", "Country": "Australia", "Longitude": "146.3860398", "Trick": "First \"Sillywilly\" (360 Double frontflip)", "Latitude": "-38.2368572", "Video": "https://www.youtube.com/watch?v=KzYVQz3sZe0", "Pictures": "", "Date": "", "Additional Information": "in Nitro Circus show"},{"Discipline": "AIR", "City": "army airfield near Kiev", "Name": "Pyotr Nesterov", "Country": "Russia", "Longitude": "31.2349562", "Trick": "First loop in a plane", "Latitude": "51.4165878", "Video": "", "Pictures": "", "Date": "9/9/1913", "Additional Information": ""},{"Discipline": "SKY", "City": "", "Name": "Adolphe P\u00e9goud", "Country": "", "Longitude": "", "Trick": "First pilot to make a parachute jump from an airplane.", "Latitude": "", "Video": "", "Pictures": "", "Date": "", "Additional Information": ""},{"Discipline": "SWIM", "City": "", "Name": "", "Country": "", "Longitude": "", "Trick": "", "Latitude": "", "Video": "", "Pictures": "", "Date": "", "Additional Information": ""},{"Discipline": "MOTO", "City": "Bonneville, UT", "Name": "Rocky Robinson", "Country": "USA", "Longitude": "-113.7907254", "Trick": "Fastest speed on motorcycle.", "Latitude": "40.8501067", "Video": "https://www.youtube.com/watch?v=hfo1xcnLV7E", "Pictures": "", "Date": "9/25/2010", "Additional Information": ""},{"Discipline": "MOTO", "City": "", "Name": "Mark Monea", "Country": "Australia", "Longitude": "", "Trick": "First Frontflip 360.", "Latitude": "", "Video": "https://www.youtube.com/watch?v=FmNrngxV_aw", "Pictures": "", "Date": "", "Additional Information": ""},{"Discipline": "SNOWBOARD", "City": "Aspen, Colorado", "Name": "Shaun White", "Country": "USA", "Longitude": "-106.8581394", "Trick": "First perfect \"100\" score in superpipe snowboarding contest.", "Latitude": "39.2009092", "Video": "https://www.youtube.com/watch?v=y43FolFlY78", "Pictures": "", "Date": "2012", "Additional Information": "in xgames"},{"Discipline": "BMX", "City": "Wellington", "Name": "Jed Mildon", "Country": "New Zealand", "Longitude": "174.7618546", "Trick": "First double backflip tailwhip.", "Latitude": "-41.2443701", "Video": "https://www.youtube.com/watch?v=-TVUILbQfK0", "Pictures": "", "Date": "2/9/2013", "Additional Information": "in nitro circus show"},{"Discipline": "WHEELCHAIR", "City": "Woodward, PA", "Name": "Aaron Fatheringham", "Country": "USA", "Longitude": "-77.3662657", "Trick": "First Double backflip in a wheelchair.", "Latitude": "40.8985712", "Video": "https://www.youtube.com/watch?v=H--aF0l41DE", "Pictures": "", "Date": "8/26/2010", "Additional Information": "in Woodward training facility"},{"Discipline": "WHEELCHAIR", "City": "", "Name": "Aaron Fatheringham", "Country": "New Zealand", "Longitude": "", "Trick": "First Frontflip in a wheelchair.", "Latitude": "", "Video": "https://www.youtube.com/watch?v=C-nbtygkW6g", "Pictures": "", "Date": "3/1/2011", "Additional Information": "in Nitro Circus show"},{"Discipline": "SWIM", "City": "Villers-le-Lac", "Name": "Oliver Favre", "Country": "France", "Longitude": "6.6939478", "Trick": "Highest dive. 177ft / 54 m", "Latitude": "47.0729585", "Video": "https://www.youtube.com/watch?v=mLd529gWKJ4", "Pictures": "", "Date": "8/30/1987", "Additional Information": ""},{"Discipline": "SWIM", "City": "Santorini", "Name": "Herbert Nitsch", "Country": "Greece", "Longitude": "25.5617365", "Trick": "Deepest dive.  / 249.5 m", "Latitude": "36.4273221", "Video": "https://www.youtube.com/watch?v=2KGfBIdPD3M", "Pictures": "", "Date": "6/6/2012", "Additional Information": "almost died, http://www.redbull.com/cs/Satellite/en_US/Article/Freediver-Herbert-Nitsch-featured-in-April-2013-Red-Bulletin-magazine-021243322097978"},{"Discipline": "SWIM", "City": "Spetses", "Name": "Herbert Nitsch", "Country": "Greece", "Longitude": "23.1081579", "Trick": "Deepest dive.  214 m", "Latitude": "37.2382504", "Video": "https://www.youtube.com/watch?v=GzX81rySDmk", "Pictures": "", "Date": "6/14/2007", "Additional Information": ""},{"Discipline": "SNOWBOARD", "City": "Stubai", "Name": "Katie Ormerod", "Country": "Austria", "Longitude": "11.1244396", "Trick": "First female double cork 1080. ", "Latitude": "46.9925152", "Video": "https://www.youtube.com/watch?v=j4NfAsszIOk", "Pictures": "", "Date": "6/1/2014", "Additional Information": ""},{"Discipline": "SK8", "City": "Tehachapi, CA", "Name": "Tom Schaar", "Country": "USA", "Longitude": "-118.635389", "Trick": "First 1080 on a skateboard.", "Latitude": "35.080859", "Video": "https://www.youtube.com/watch?v=tbjzZHuGTng", "Pictures": "", "Date": "3/1/2012", "Additional Information": "12 years old"},{"Discipline": "SCOOTER", "City": "", "Name": "Ryan Williams", "Country": "Australia", "Longitude": "", "Trick": "First loop on a scooter.", "Latitude": "", "Video": "https://www.youtube.com/watch?v=w4hHOAEMvTY", "Pictures": "", "Date": "5/11/2012", "Additional Information": "in nitro circus practice. 2nd try"},{"Discipline": "SK8", "City": "Tampa, Florida", "Name": "Bob Burnquist", "Country": "USA", "Longitude": "-82.442527", "Trick": "First to do the loop \"switch\" on a skateboard. ", "Latitude": "27.9734087", "Video": "https://www.youtube.com/watch?v=lZeMXqGNT4o", "Pictures": "", "Date": "2001", "Additional Information": "at skate contest"},{"Discipline": "BMX", "City": "Dunedin", "Name": "Andy Buckworth", "Country": "New Zeland", "Longitude": "170.5168191", "Trick": "First Superman Double Frontflip.", "Latitude": "-45.8867953", "Video": "https://www.youtube.com/watch?v=qW24YSFt7L8", "Pictures": "", "Date": "2011", "Additional Information": "In nitro circus show"},{"Discipline": "SK8", "City": "Ju Yong Guan Gate", "Name": "Danny Way", "Country": "China", "Longitude": "116.570375", "Trick": "First to jump the Great Wall of China without a motor.", "Latitude": "40.431908", "Video": "https://www.youtube.com/watch?v=zsqFjvZ4Mqw", "Pictures": "", "Date": "7/9/2005", "Additional Information": "Crashed hard his fisrt jump"},{"Discipline": "SK8", "City": "Colorado", "Name": "Mischo Erban", "Country": "USA", "Longitude": "-105.1440729", "Trick": "Highspeed on skateboard. 130.08 km/h (80.83 mph)", "Latitude": "39.3131427", "Video": "https://www.youtube.com/watch?v=EahajVER2mo", "Pictures": "", "Date": "9/30/2010", "Additional Information": "Secret location in Colorado"},{"Discipline": "SK8", "City": "", "Name": "Danny Way ", "Country": "", "Longitude": "", "Trick": "Biggest skateboard air. 23.5 ft / 7.2 m", "Latitude": "", "Video": "https://www.youtube.com/watch?v=5aosZJYFbnQ", "Pictures": "", "Date": "2003", "Additional Information": ""},{"Discipline": "SK8", "City": "", "Name": "Danny Way", "Country": "", "Longitude": "", "Trick": "First to drop into ramp from a helicopter.", "Latitude": "", "Video": "https://www.youtube.com/watch?v=4CeMWLMFM-Q", "Pictures": "", "Date": "1997", "Additional Information": " Rob Dyrdek recalls his experience of watching Way attempting the helicopter drop-in. Way executed this stunt when he was only 23 years old back in 1997. He would later go on to jump over the Great Wall of China on a skateboard."},{"Discipline": "SK8", "City": "Mexico City", "Name": "Danny Way", "Country": "Mexico", "Longitude": "-99.1521845", "Trick": "First to do an \"El Camino\". (\"rocket grab\" backflip)", "Latitude": "19.3200988", "Video": "", "Pictures": "", "Date": "2006", "Additional Information": ""},{"Discipline": "SK8", "City": "Las Vegas, Nevada", "Name": "Danny Way", "Country": "USA", "Longitude": "-115.153588", "Trick": "First to drop into a ramp from the top of the guitar sculpture at the Hard Rock Cafe & Casino. 82 ft / 25 m", "Latitude": "36.109163", "Video": "https://www.youtube.com/watch?v=zQtoa5mkZIk", "Pictures": "", "Date": "2006", "Additional Information": ""},{"Discipline": "CAR", "City": "", "Name": "", "Country": "", "Longitude": "", "Trick": "", "Latitude": "", "Video": "", "Pictures": "", "Date": "", "Additional Information": ""},{"Discipline": "CAR ", "City": "", "Name": "", "Country": "", "Longitude": "", "Trick": "", "Latitude": "", "Video": "", "Pictures": "", "Date": "", "Additional Information": ""},{"Discipline": "CLIMB", "City": "Mahalangur", "Name": "Reinhold Messner & Peter Habeler", "Country": "Nepal ", "Longitude": "86.9249772", "Trick": "First men ever to climb Everest without the use of supplemental oxygen", "Latitude": "27.9877419", "Video": "", "Pictures": "", "Date": "5/8/1978", "Additional Information": "Prior to this ascent it was disputed whether this was possible at all."},{"Discipline": "CLIMB", "City": "Yosemite, CA", "Name": "Warren Harding, Wayne Merry and George Whitmore", "Country": "USA", "Longitude": "-119.5401207", "Trick": "First men to climg \"The Nose\"", "Latitude": "37.8656092", "Video": "", "Pictures": "", "Date": "1958", "Additional Information": "The granite monolith extends about 3,000 feet (900 m) from base to summit along its tallest face. The formation was named \"El Capitan\" by the Mariposa Battalion when it explored the valley in 1851. Took 47 days using \"siege\" tactics: climbing in an expedition style using fixed ropes along the length of the route, linking established camps along the way."},{"Discipline": "SKI", "City": "", "Name": "Felicity Aston", "Country": "Antartica", "Longitude": "23.1842677", "Trick": "First women to skii across Antartica", "Latitude": "-74.7363522", "Video": "https://www.youtube.com/watch?v=APPP3OJHAa8", "Pictures": "", "Date": "1/24/2012", "Additional Information": "She spent the last three years as a researcher in Antarctica and has been a part of expeditions in Siberia, Greenland and the Arctic, according to the Guardian. It was traveling alone that raised the bar for her."},{"Discipline": "SKI", "City": "Ladis", "Name": "Kaya Turski ", "Country": "Austria", "Longitude": "10.6477006", "Trick": "First women switch 1080 on skiis", "Latitude": "47.0716454", "Video": "https://www.youtube.com/watch?v=Bc669GIaybs", "Pictures": "", "Date": "3/1/2011", "Additional Information": "5 minutes later Maria Bagge was the 2nd women to land the trick. "},{"Discipline": "", "City": "", "Name": "", "Country": "", "Longitude": "", "Trick": "Biggest drop on skiis", "Latitude": "", "Video": "", "Pictures": "", "Date": "", "Additional Information": ""},{"Discipline": "CLIMB", "City": "Gilgit\u2013Baltistan", "Name": " Lino Lacedelli and Achille Compagnoni", "Country": "Pakistan", "Longitude": "", "Trick": "First to climb K2", "Latitude": "", "Video": "", "Pictures": "", "Date": "7/31/1954", "Additional Information": "K2 is known as the Savage Mountain due to the extreme difficulty of ascent and the second-highest fatality rate among the eight thousanders. One in every four people who have attempted the summit have died trying"},{"Discipline": "SWIM", "City": "Dover", "Name": "Captain Matthew Webb", "Country": "England", "Longitude": "-2.3256601", "Trick": "First to swim the English Channel without the use of artificial aids", "Latitude": "50.8726342", "Video": "", "Pictures": "", "Date": "8/25/1875", "Additional Information": "He swam from Dover to Calais in less than 22 hours."},{"Discipline": "SWIM", "City": "", "Name": "Gertrude Ederle", "Country": "England", "Longitude": "-2.3256601", "Trick": "First woman to swim the English Channel without the use of artificial aids", "Latitude": "50.8726342", "Video": "", "Pictures": "", "Date": "1926", "Additional Information": "She was an American competition swimmer, Olympic champion, and former world record-holder"},{"Discipline": "SWIM", "City": "Ceylon", "Name": "Mihir Sen", "Country": "Sri Lanka ", "Longitude": "79.8486328", "Trick": "First Indian on record to swim across the Palk Straits", "Latitude": "9.7120842", "Video": "", "Pictures": "", "Date": "April 5\u20136, 1966 ", "Additional Information": "Swam between Ceylon (Sri Lanka) and Dhanushkodi (India) in 25 hours and 36 minutes."},{"Discipline": "SWIM", "City": "", "Name": "Beno\u00eet Lecomte", "Country": "Atlaltic Ocean", "Longitude": "-42.673645", "Trick": "First man to swim across the Atlantic Ocean without a kick board", "Latitude": "35.8069398", "Video": "", "Pictures": "", "Date": "1998", "Additional Information": "French-born long distance swimmer.  During his 3,716 mile journey in 73 days, he was accompanied by a 40 ft. sailboat that had an electromagnetic field for 25 feet to ward off sharks."},{"Discipline": "SWIM", "City": "", "Name": "Jennifer Figge", "Country": "Atlaltic Ocean", "Longitude": "-42.673645", "Trick": "First woman to swim across the Atlantic Ocean without a kick board", "Latitude": "35.8069398", "Video": "", "Pictures": "", "Date": "2009", "Additional Information": "The 56-year-old left the Cape Verde Islands off Africa's western coast on Jan. 12, battling waves of up to 30 feet and strong winds"},{"Discipline": "CLIMB", "City": "Tanzania", "Name": "Hans Meyer and  Ludwig Purtscheller", "Country": "Africa ", "Longitude": "37.3524428", "Trick": "First to climb Mount Kilimanjaro", "Latitude": "-3.0696375", "Video": "", "Pictures": "", "Date": "10/6/1889", "Additional Information": "The success of this attempt was based on the establishment of several campsites with food supplies so that multiple attempts at the top could be made without having to descend too far"}]};
	$scope.disciplines = ['AIR','BMX','SK8','RALLY','SNOW','CAR','SCOOTER','MTB','CLIMB','ADVENTURE','URBAN'];

	$scope.selections = {};

	$scope.loadData = function() {
		data.Events.forEach(function(item){
			Data.pushObjectToFirebase(item);
			$scope.enteredData.push(item);
		});
	}
})

.factory('Data', function($firebaseArray) {
	var rootRef = new Firebase('https://braggingrights.firebaseio.com/Events');
	var rootObj = $firebaseArray(rootRef);
	return {
		pushObjectToFirebase: function(object) {
			rootObj.$add(object);
		}
	}
})

;