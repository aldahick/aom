import React, { useState } from "react";
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,
  TextField,
} from "@material-ui/core";
import * as _ from "lodash";
import { useStores } from "../../hook/useStores";
import { AddButton } from "./AddButton";

type OnChange = (value: string) => void;

interface FieldDefinition {
  initialValue?: string;
  label?: string;
  render?: (value: string | undefined, onChange: OnChange) => JSX.Element;
}

interface DialogFormProps<FieldKey extends string> {
  fields: {
    [key in FieldKey]: FieldDefinition
  };
  title: string;
  onSubmit: (fields: {[key in FieldKey]: string}) => Promise<string | undefined | void>;
}

export const DialogForm = <FieldKey extends string>({ fields, title, onSubmit }: DialogFormProps<FieldKey>) => {
  const { statusStore } = useStores();
  const [open, setOpen] = useState(false);

  const initialFieldValues = Object.fromEntries<string>(
    Object.entries<FieldDefinition>(fields)
      .map(([key, { initialValue }]) => [key, initialValue || ""]),
  ) as any as {[key in FieldKey]: string};
  const [fieldValues, setFieldValues] = useState<{[key in FieldKey]: string}>(initialFieldValues);

  const onFieldChange = (fieldKey: FieldKey, value: string) => {
    setFieldValues({
      ...fieldValues,
      [fieldKey]: value,
    });
  };

  const submit = () => {
    const missingFields = (Object.entries(fields) as [FieldKey, FieldDefinition][])
      .filter(([fieldKey]) => !fields[fieldKey]);
    if (missingFields.length > 0) {
      const labels = missingFields.map(([fieldKey, { label }]) => label || _.startCase(fieldKey));
      statusStore.setErrorMessage(`Missing field values: ${labels.join(", ")}`);
      return;
    }
    onSubmit(fieldValues as {[key in FieldKey]: string})
      .then(successMessage => {
        if (successMessage) {
          statusStore.setSuccessMessage(successMessage);
        }
        setOpen(false);
      })
      .catch(err => statusStore.setErrorMessage(err.message));
  };

  const checkEnterKey = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key.toLowerCase() === "enter") {
      submit();
    }
  };

  return (
    <>
      <AddButton onClick={() => setOpen(true)} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            {(Object.entries(fields) as [FieldKey, FieldDefinition][])
              .map(([fieldKey, { label, render }], i) => (
                <Grid item key={fieldKey}>
                  {render
                    ? render(fieldValues[fieldKey], (value: string) => onFieldChange(fieldKey, value))
                    : (
                      <TextField
                        label={label || _.startCase(fieldKey)}
                        autoFocus={i === 0}
                        fullWidth
                        onChange={evt => onFieldChange(fieldKey, evt.target.value)}
                        onKeyDown={checkEnterKey}
                      />
                    )}
                </Grid>
              ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={submit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
