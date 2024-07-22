const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSettingColors', [
    {
      id: uuidv4(),
      

      	
      color1:"rgb(54, 95, 133)"	,
      color1Light1: "#97bce7",	
      color1Light2: "#7ea4ce",	
      color1Light3: "#668cb5",
      color1Light4: "#4e759d"	,
      color1Dark1: "#1c4a6e"	,
      color1Dark2: "#000f2f"	,
      color1Dark3: "#002343"	,
      color1Dark4: "#000f2f"	,
      color2:"rgb(37, 120, 50)"	,
      color2Light1:"#89da8c"	,
      color2Light2:"#70c074"	,
      color2Light3:"#58a85d"	,
      color2Light4:"#3f9047"	,
      color2Dark1:"#00611d"	,
      color2Dark2:"#004b07"	,
      color2Dark3:"#003600"	,
      color2Dark4:"#002400"	,
      color3:"rgb(72, 167, 127)"	,
      color3Light1:"#adffe0"	,
      color3Light2:"#94f3c7"	,
      color3Light3:"#7bd9ae"	,
      color3Light4:"#61c096"	,
      color3Dark1:"#2d8f68"	,
      color3Dark2:"#067753"	,
      color3Dark3:"#00603e"	,
      color3Dark4:"#004a2a"	,
      color4:"rgb(143, 78, 41)"	,
      color4Light1:"#f8aa80"	,
      color4Light2:"#dd9269"	,
      color4Light3:"#c37b53"	,
      color4Light4:"#a9643e"	,
      color4Dark1:"#763915"	,
      color4Dark2:"#5d2400"	,
      color4Dark3:"#470f00"	,
      color4Dark4:"#350000"	,
      color5:"rgb(107, 52, 108)"	,
      color5Light1:"#cc8ecb"	,
      color5Light2:"#b377b3"	,
      color5Light3:"#9a609a"	,
      color5Light4:"#824a83"	,
      color5Dark1:"#541f56"	,
      color5Dark2:"#3e0741"	,
      color5Dark3:"#2a002d"	,
      color5Dark4:"#1e001b"	,
      color6:"rgb(149, 48, 114)"	,
      color6Light1:"#fd91d2"	,
      color6Light2:"#e278b9"	,
      color6Light3:"#c860a1"	,
      color6Light4:"#ae4889"	,
      color6Dark1:"#7c145c"	,
      color6Dark2:"#640046"	,
      color6Dark3:"#4c0032"	,
      color6Dark4:"#37001f"	,
      color7:"rgb(171, 67, 67)"	,
      color7Light1:"#ffa29c"	,
      color7Light2:"#fc8a85"	,
      color7Light3:"#e1726e"	,
      color7Light4:"#c65a58"	,
      color7Dark1:"#912b2f"	,
      color7Dark2:"#77111c"	,
      color7Dark3:"#5d0007"	,
      color7Dark4:"#460000",
      isReady: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {})
}

async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('backendSettingColors', {});
}

module.exports = { up, down };
