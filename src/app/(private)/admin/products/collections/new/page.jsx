import React from "react";
import {
  addCollectionFormControls,
  addProductFormControls,
} from "@/config/form/forms-data";
import { FormElemRenderer } from "@/utils/formElementRenderer";
import { title } from "process";
import AddPageLayout from "@/components/admin/layouts/add-page-layout";
import { Button } from "@/components/ui/button";

const AddProduct = () => {
  return (
    <AddPageLayout pathname="/products/new" title="Add Product">
      <form className="space-y-4">
        <div className="flex justify-end items-center gap-4">
          <Button variant={"outline"}>Cancel</Button>
          <Button>Submit</Button>
        </div>
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-4 space-y-4">
            {addCollectionFormControls[0].children.map((formGroup) => (
              <InputGroupCard
                key={formGroup.groupLabel}
                label={formGroup.groupLabel}
              >
                {formGroup.items.map((elem) => (
                  <FormElemRenderer key={elem.name} elem={elem} />
                ))}
              </InputGroupCard>
            ))}
          </div>
          <div className="col-span-2 space-y-4">
            {addCollectionFormControls[1].children.map((formGroup) => (
              <InputGroupCard
                key={formGroup.groupLabel}
                label={formGroup.groupLabel}
              >
                {formGroup.items.map((elem) => (
                  <FormElemRenderer key={elem.name} elem={elem} />
                ))}
              </InputGroupCard>
            ))}
          </div>
        </div>
      </form>
    </AddPageLayout>
  );
};

const InputGroupCard = ({ children, label }) => {
  return (
    <div className="p-6 shadow-md border-2 rounded-lg bg-slate-50 flex flex-col items-start gap-4">
      <p>{label}</p>
      {children}
    </div>
  );
};

export default AddProduct;
