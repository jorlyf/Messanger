import InputMessage from "../models/InputMessage";

export const trimString = (value: string) => {
  return value.trim().replace(/  +/g, ' ').replace(/\n\s*\n\s*\n/g, '\n\n');
}
export const getElement = (elementName: string) => {
  const element: HTMLElement | null = document.getElementById(elementName);
  if (!element) {
    console.error("Элемент не найден");
    return null;
  }
  return element;
}
export const scrollDown = (elementName: string): void => {
  const element: HTMLElement | null = getElement(elementName);
  if (!element) return;
  element.scrollTop = element.scrollHeight;
}
export const isScrolledDown = (elementName: string): boolean => {
  const element: HTMLElement | null = getElement(elementName);
  if (!element) return false;
  return element.scrollTop >= (element.scrollHeight - element.offsetHeight);
}
export const getCurrentTime = () => {
  return new Date().toLocaleTimeString('ru', { hour12: false, hour: "numeric", minute: "numeric" });
}
export const createInputMessageFormData = (message: InputMessage): FormData => {
  const formData: FormData = new FormData();

  formData.set("MessageText", message.messageText);
  message.attachments.forEach((attachment, index) => {
    formData.append(`Attachments[${index}].Id`, attachment.id.toString());
    formData.append(`Attachments[${index}].File`, attachment.file);
    formData.append(`Attachments[${index}].Type`, attachment.type);
    formData.append(`Attachments[${index}].FileName`, attachment.file.name);
  });

  return formData;
}