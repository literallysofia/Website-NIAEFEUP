var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
    name: { type: Types.Name, required: true, index: true },
    email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
    password: { type: Types.Password, initial: true, required: true },
    photo_path: { type: String, label: 'Photo path on server', default : "/images/members/default-profile.jpg" },
    linkedin: { type: Types.Url },
    github: { type: Types.Url },
    website: { type: Types.Url },
    about: { type: Types.Textarea },
    public: { type: Boolean, label: 'Is the profile public?', initial: true },
}, 'Permissions', {
    isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
    position: {
        type: Types.Select,
        options: 'Admin, Membro, Recruta, Presidente, Vice-Presidente e Gestor de Projetos, Vice-Presidente e Gestor de Eventos, Tesoureiro, Secretário e Responsável pela Sala, Responsável pela Imagem e Comunicação',
        initial: true,
        required: true
    },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
    return this.isAdmin;
});


/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });

/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
