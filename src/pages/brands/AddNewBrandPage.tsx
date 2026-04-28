import { useAppForm } from "@/components/AppFormHook";
import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  Drawer,
} from "@/components/ui/drawer";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useBrands } from "./data/use-brands";

export function AddNewBrandPage() {
  const [open, setOpen] = useState(true);
  const { brandId } = useParams({ strict: false });
  const navigate = useNavigate();
  const { brands, createBrand, updateBrand } = useBrands();
  const brand = brands?.find((brand) => brand.id === brandId);
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      navigate({ to: "/brands" });
    }, 300);
  };

  const form = useAppForm({
    defaultValues: {
      name: brand?.name || "",
    },
    validators: {
      // Pass a schema or function to validate
      onChange: z.object({
        name: z.string(),
      }),
    },
    onSubmit: ({ value }) => {
      if (brand) {
        updateBrand.mutate({ id: brand.id, brand: value });
      } else {
        createBrand.mutate(value);
      }
      handleClose();
    },
  });
  return (
    <Drawer open={open} direction="right">
      <form>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{brand ? `Edit ${brand.name}` : "Add New Brand"}</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <form.AppField
              name="name"
              children={(field) => (
                <field.CustomInput field={field} name="name" label="Name" />
              )}
            />
          </div>
          <DrawerFooter className="flex flex-row">
            <Button variant="outline" className="flex-1" onClick={handleClose}>
              Cancel
            </Button>
            <form.AppForm>
              <form.Button
                className="flex-1"
                onClick={() => form.handleSubmit()}
              >
                Submit
              </form.Button>
            </form.AppForm>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
}
