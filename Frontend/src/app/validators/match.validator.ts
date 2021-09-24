import { FormGroup } from "@angular/forms";

export const match = (firstField: string, secondField: string) => (formGroup: FormGroup) => {
    const firstControl = formGroup.get(firstField);
    const secondControl = formGroup.get(secondField);

    if (secondControl && firstControl) {
        if (secondControl.errors && !secondControl.errors.match) return;

        if (firstControl.value !== secondControl.value) {
            secondControl.setErrors({ match: true });
        } else {
            secondControl.setErrors(null);
        }
    }
}