const { async } = require("regenerator-runtime")
const Contact = require("../models/ContactModel")

module.exports = {
    index: async (req, res) => {
        const contacts = await Contact.findAll();
        return res.render("contacts/index", {contacts})
    },
    register: async(req, res) => {
        return res.render("contacts/register", {user: ""})
    },
    create: async(req, res) => {
        const contact = new Contact(req.body)
        await contact.register()

        if(contact.errors.length>0) {
            req.flash("errors", contact.errors)
            req.session.save(() => {
                return res.redirect("/contact/register")
            })
            return;
        }
        
        req.flash("success", "Contato adicionado com sucesso!")
        req.session.save(() => {
            return res.redirect(`/contact/edit/${contact.contact._id}`)
        })
    }, 
    editIndex: async(req, res) => {
        const user = await Contact.findById(req.params.id)
        if(!user) {
            return res.render("404")
        }
        return res.render("contacts/register", {user})
    }, 
    edit: async(req, res) => {
        const contact = new Contact(req.body);

        try {
            await contact.edit(req.params.id)
            if(contact.errors.length>0) {
                req.flash("errors", contact.errors)
                req.session.save(() => {
                    return res.redirect(`/contact/edit/${req.params.id}`);
                })
                return;
            }

            req.flash("success", "Contato alterado com sucesso!")
            req.session.save(() => {
                return res.redirect(`/contact/edit/${req.params.id}`)
            })
        } catch (error) {
            return res.render("404")
        }
    },
    delete: async(req, res) => {
        try {
            await Contact.delete(req.params.id)
            req.flash("success", "Contato deletado com sucesso!")
            req.session.save(() => {
                return res.redirect("/contacts")
            })
        } catch (error) {
            return res.redirect("404")
        }
    }
}