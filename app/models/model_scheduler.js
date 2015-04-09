exports.definition = {
	config: {
		columns: {
		    "nombre": "string",
		    "id": "string",
		    "descripcion_corta": "string",
		    "descripcion": "string",
		    "fecha_evento": "string",
		    "imagen1": "string",
		},
		adapter: {
			type: "sql",
			collection_name: "model_scheduler"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};