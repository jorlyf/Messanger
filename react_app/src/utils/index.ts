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
export const createFormData = (files: any[]): FormData => {
  const formData: FormData = new FormData();
  
  for (const file of files) {
    formData.append('files', file);
  };

  return formData;
}