const mongoose = require('mongoose');
const validator = require("validator")
const bcrypt = require("bcryptjs")

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: {type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body
    this.errors = [];
    this.user = null
  }

  async login() {
    this.valida()
    if(this.errors.length>0) return;

    const user = await LoginModel.findOne({email: this.body.email})
    if(!user) {
      this.errors.push("Este e-mail não está cadastrado")
      return;
    }

    if(!bcrypt.compareSync(this.body.password, user.password)) {
      this.errors.push("A senha está inválida")
      return;
    }

    this.user = user;
  }

  async register() {
    this.valida();
    if(this.errors.length>0) return;

    await this.userExist();
    if(this.errors.length>0) return;

    const salt = await bcrypt.genSalt();
    this.body.password = await bcrypt.hash(this.body.password, salt)
    this.user = await LoginModel.create(this.body)
  }

  async userExist() {
    const user = await LoginModel.findOne({email: this.body.email})
    if(user) this.errors.push("Este usuário já existe!")
  }

  valida() {
    this.cleanUp();

    if(!validator.isEmail(this.body.email)) this.errors.push("E-mail inválido")
    if(this.body.password.length<3 || this.body.password.length>50) this.errors.push("Sua senha deve ter entre 3 e 50 caracteres")
  }

  cleanUp() {
    for(let field in this.body) {
      if(typeof this.body[field] !== "string") {
        this.body[field] = "";
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }
}

module.exports = Login;
