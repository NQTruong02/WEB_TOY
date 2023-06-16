var express = require ('express');
const ToyModel = require('../models/ToyModels');
var router = express.Router();





router.get('/', async (req, res) => {
   var Toy_Index = await ToyModel.find({})
   res.render('Toy/index', { Toy : Toy_Index })
})
router.get('/Buy', async (req, res) => {
   var Toy_Buy = await ToyModel.find({})
   res.render('Toy/Buy', { Toy: Toy_Buy })
})

router.get('/AllProduct', async (req, res) => {
   var AllProduct = await ToyModel.find({})
   res.render('Toy/AllProduct', { Toy: AllProduct })
})
router.get('/AdminAllProduct', async (req, res) => {
   var AdminAllProduct = await ToyModel.find({})
   res.render('Toy/AdminAllProduct', { Toy: AdminAllProduct })
})



router.get("/Detail/:id", (req, res) => {
   //lấy giá trị id của document gửi từ url
   var Toy_id = req.params.id;
   //tìm kiếm document trong collection theo id
   ToyModel.findById(Toy_id, (err, data) => {
     if (!err) {
       //render ra file detail chứa dữ liệu của document
       res.render("Toy/Detail", { Toy: data });
     }
   });
 });


router.get('/Add', (req, res) => {
   res.render('Toy/Add');
})

router.post('/Add', async (req, res) => {
   var Toy = req.body;
   await ToyModel.create(Toy)
   .then(() => { console.log ("Add new Toy succeed !")});
   res.redirect('/Toy');
})

router.get('/delete/:id', async(req, res) => {
   await ToyModel.findByIdAndDelete(req.params.id)
   .then(() => { console.log ('Delete Toy succeed !')});
   res.redirect('/Toy');
})


router.get("/Edit/:id", (req, res) => {
   ToyModel.findById(req.params.id, (err, data) => {
     if (!err) {
        res.render("Toy/Edit", { Toy: data })
     }
   })
})

router.post("/Edit/:id", (req, res) => {
    ToyModel.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (!err) {
        console.log("Edit Toy succeed !")
        res.redirect("/Toy")
      }
    })
})



//search function
//   router.post('/Toy/search', async (req, res) => {
//      var keyword = req.body.keyword;
//      var search = await ToyModel.find({ name: new RegExp(keyword, "i")})
//     res.render('Toy/AllProduct', { Toy : search })
// })


router.post("/search", async (req, res) => {
   const search = req.body.search;
   const results = await ToyModel.find({ name: new RegExp(search, "i")});
   console.log(results);
   res.render("Toy/AdminAllProduct", { results: results })
})








module.exports = router;