import User from './repository';

class UserController {
    
    constructor(){}

    public getAll() {
        return User.find({});
    }
    
    public getById(id) {
        return User.findById(id);
    }

    public create(user) {
        return User.create(user);
    }

    public update(id, user) {
        const updateUser = {
            name: user.name,
            email: user.email,
            password: user.password
        }

        return User.findByIdAndUpdate(id, updateUser);
    }

    public delete(id) {
        return User.remove(id);
    }
}

export default new UserController();