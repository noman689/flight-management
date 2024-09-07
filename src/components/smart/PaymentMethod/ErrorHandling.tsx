export function getFriendlyErrorMessage(error) {
    if (error.response && error.response.data && error.response.data.errors) {
        // Handle validation errors
        const validationError = error.response.data.errors.find((e) => e.type === "validation_error");
        if (validationError) {
            switch (validationError.code) {
                case "offer_request_already_booked":
                    return "Selected offers have already been booked. Please perform a new search.";
                // Add additional cases for other validation errors as needed
                default:
                    return "Validation error. Please check your input and try again.";
            }
        }
        // Handle other types of errors
        else {
            const errorMessage = error.response.data.errors[0].message;
            switch (errorMessage) {
                case "Insufficient funds":
                    return "Insufficient funds. Please add funds to your account and try again.";
                // Add additional cases for other types of errors as needed
                default:
                    return "An error occurred. Please try again later.";
            }
        }
    } else {
        // Handle non-API errors
        switch (error.code) {
            case "ECONNABORTED":
                return "The request timed out. Please check your internet connection and try again.";
            case "ENOTFOUND":
                return "The server could not be found. Please check your internet connection and try again.";
            // Add additional cases for other types of errors as needed
            default:
                return "An error occurred. Please try again later.";
        }
    }
}
