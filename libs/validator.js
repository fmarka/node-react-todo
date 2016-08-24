// Form Validator
module.exports = {

  validate(req, fieldNames) {

    var err = false;
    var errors = {};
    var values = {};

    for (var i = 0; i < fieldNames.length; i++) {

      var name = fieldNames[i];

      if (typeof req.body != "undefined" && name in req.body) {
        var fieldValue = req.body[name].trim();
        if (fieldValue == "")
          errors[name] = "Please enter " + name + ".";
        else
          values[name] = fieldValue;
      } else {
        errors[name] = "Please enter " + name + ".";
      }
    }

    if (Object.keys(errors).length) {
      err = true;
    }

    return {
      err: err,
      errors: errors,
      values: values
    };
  },
}