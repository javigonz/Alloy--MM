var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            nombre: "string",
            id: "string",
            descripcion_corta: "string",
            descripcion: "string",
            fecha_evento: "string",
            imagen1: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "model_scheduler"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

model = Alloy.M("model_scheduler", exports.definition, []);

collection = Alloy.C("model_scheduler", exports.definition, model);

exports.Model = model;

exports.Collection = collection;