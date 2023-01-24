const mongoose = require("mongoose");
const validator = require("validator")

const ContactSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    phone: {type: Number, required: false, default: ''},
    createdAt: {type: Date, default: new Date()}
})

const ContactModel = mongoose.model("Contact", ContactSchema);

class Contact {
    constructor(body) {
        this.body = body
        this.errors = []
        this.contact = null
    }

    static async findById(id) {
        const contact = await ContactModel.findById(id);
        return contact;
    }

    static async findAll() {
        const contacts = await ContactModel.find().sort({createdAt: 1})
        return contacts
    }

    async register() {
        this.valida();
        if(this.errors.length>0) return;

        this.contact = await ContactModel.create(this.body)
    }

    async edit(id) {
        this.valida()
        if(this.errors.length>0) return;

        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {new: true})
    }

    static async delete(id) {
        await ContactModel.findByIdAndDelete(id);
    }

    valida() {
        this.cleanUp();
        if(this.body.name.length <=0) this.errors.push("O nome do contato é obrigatório")
        if(this.body.email.length<=0 && this.body.phone.length<=0) this.errors.push("Um dos campos de contato precisa ser preenchido") 
        if(this.body.email.length>0 && !validator.isEmail(this.body.email)) this.errors.push("E-mail inválido")
    }

    cleanUp() {
        for(let field in this.body) {
            if(typeof this.body[field] !== "string") {
                this.body[field] = "";
            }
        }

        this.body = {
            name: this.body.name, 
            lastName: this.body.lastName, 
            email: this.body.email, 
            phone: this.body.phone
        }
    }

}

module.exports = Contact;