const express = require('express')
const uuid = require('uuid')
const router = express.Router();
const members = require('./members')
router.get('/' , (req , res) => res.send(members))
router.get('/:id' , (req, res) => {
    const found  = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }
    else{
        res.status(400).json({msg : 'Member not found'})
    }
})

// creating members
router.post('/' , (req , res) => {
    const newMember = {
        id : uuid.v4(),
        name : req.body.name,
        email : req.body.email,
        status : 'active'

    }
    if(!newMember.name || !newMember.email) {
        return res.status(400).json({msg : 'please enter name and email details'})
        
    }
    members.push(newMember)
    // res.json(members)
    res.redirect('/')
})
 
//update members.

router.put('/:id' , (req, res) => {
    const found  = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        const updMember = req.body
        members.map(upd => {
            if(upd.id === parseInt(req.params.id)){
                upd.name = updMember.name ? updMember.name : upd.name
                upd.email = updMember.email ? updMember.email : upd.email
                res.json({msg : 'data successfully updated' , members})
            }
        })
    }
    else{
        res.status(400).json({msg : 'Member not found'})
    }
})
// delete members

router.delete('/:id' , (req, res) => {
    const found  = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        let index = -1;
        members.map(search => {
            if(search.id === parseInt(req.params.id)){
                index = members.indexOf(search)
            }
        })
        members.splice(index , 1);
        res.json({msg : 'member deleted' , member : members})
    }
    else{
        res.status(400).json({msg : 'Member not found'})
    }
})
module.exports = router