// dependencies
import { toast } from "react-toastify";

/**
 * Creates a toast notification using the 'react-toastify' package.
 * 
 * @param {string} msg - The message to display in the toast.
 * @param {"error"|"info"|"success"|"warning"} type - The type of the toast. Defaults to 'error'.
 * @param {object} options - Additional options for the toast in object structre.
 * @returns {void}
 */
export const CreateToast = (msg, type = "error", options) => {
  return toast[type](msg, options);
};
