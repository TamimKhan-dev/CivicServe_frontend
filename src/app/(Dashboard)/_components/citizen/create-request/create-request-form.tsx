"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MapPin, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useCategories,
  useCreateRequest,
  useDepartments,
  useServices,
} from "@/hooks/useRequests";
import { getErrorMessage } from "@/lib/getErrorMessage";
import type {
  CreateRequestPayload,
  RequestCategory,
} from "@/types/requests-types";
import type { CreateRequestValues } from "@/validations/request.validation";
import {
  createRequestSchema,
  TITLE_MAX,
} from "@/validations/request.validation";
import { RequestImageUploadField } from "./request-image-upload";
import { RequestTypeSelector } from "./request-type-selector";

const selectClass = "h-11 w-full";

export default function CreateRequestForm() {
  const router = useRouter();
  const { mutate: createRequest, isPending: isRequestCreating } =
    useCreateRequest();

  const { data: categoryRes, isPending: categoriesPending } = useCategories();
  const { data: departmentRes } = useDepartments();
  const { data: serviceRes, isPending: servicesPending } = useServices();

  const categories = ((categoryRes?.data ?? []) as RequestCategory[]).filter(
    (c) => c.isActive,
  );
  const departments = departmentRes?.data ?? [];
  const services = (serviceRes?.data ?? []).filter((s) => s.isActive);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<CreateRequestValues>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      type: "COMPLAINT_REQUEST",
      title: "",
      categoryId: "",
      departmentId: "",
      serviceId: "",
      description: "",
      location: "",
      image: null,
    },
  });

  const type = watch("type");
  const title = watch("title");
  const departmentId = watch("departmentId");
  const serviceId = watch("serviceId");

  const isService = type === "SERVICE_REQUEST";
  const departmentName =
    departments.find((d) => d.id === departmentId)?.name ?? "";
  const departmentServices = services.filter(
    (s) => s.departmentId === departmentId,
  );
  const selectedService = departmentServices.find((s) => s.id === serviceId);

  const onSubmit = (values: CreateRequestValues) => {
    const payload: CreateRequestPayload = {
      type: values.type,
      title: values.title,
      description: values.description,
      location: values.location,
      departmentId: values.departmentId,
      categoryId: values.categoryId,
      ...(values.type === "SERVICE_REQUEST" && { serviceId: values.serviceId }),
    };

    createRequest(
      { payload, image: values.image },
      {
        onSuccess: ({ imageFailed }) => {
          if (imageFailed) {
            toast.warning(
              "Request created, but the image could not be uploaded.",
            );
          } else if (values.type === "SERVICE_REQUEST") {
            toast.success(
              "Service request submitted. You can pay for it from My Requests.",
            );
          } else {
            toast.success("Complaint submitted successfully.");
          }
          router.push("/citizen/my-requests");
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6 rounded-2xl bg-white p-5 shadow-sm sm:p-8"
    >
      {/* Request type */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-900">Request Type *</p>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <RequestTypeSelector
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                if (value === "COMPLAINT_REQUEST") setValue("serviceId", "");
              }}
            />
          )}
        />
      </div>

      {/* Title */}
      <Field
        id="title"
        label="Title *"
        error={errors.title?.message}
        hint="Provide a concise, descriptive headline for field response teams."
        labelAction={
          <span className="text-xs text-slate-500">
            {title.length} / {TITLE_MAX}
          </span>
        }
      >
        <Input
          id="title"
          maxLength={TITLE_MAX}
          placeholder="e.g. Pothole repair required near school crosswalk"
          aria-invalid={!!errors.title}
          className="h-11"
          {...register("title")}
        />
      </Field>

      {/* Category + Department */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="category"
          label="Category *"
          error={errors.categoryId?.message}
        >
          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <Select
                value={field.value}
                disabled={categoriesPending}
                onValueChange={(id) => {
                  field.onChange(id);
                  const category = categories.find((c) => c.id === id);
                  setValue("departmentId", category?.departmentId ?? "", {
                    shouldValidate: true,
                  });
                  setValue("serviceId", "");
                }}
              >
                <SelectTrigger
                  id="category"
                  className={selectClass}
                  aria-invalid={!!errors.categoryId}
                >
                  <SelectValue
                    placeholder={
                      categoriesPending ? "Loading..." : "Select a category"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field
          id="department"
          label="Department *"
          error={errors.departmentId?.message}
        >
          <Input
            id="department"
            readOnly
            tabIndex={-1}
            value={departmentName}
            placeholder="Filled in from the category"
            className="h-11 cursor-not-allowed bg-slate-50 text-slate-700"
          />
        </Field>
      </div>

      {/* Service (only for service requests) */}
      {isService && (
        <Field
          id="service"
          label="Service *"
          error={errors.serviceId?.message}
          hint={
            selectedService
              ? `Fee: ${selectedService.fee}. You can pay for it from My Requests after submitting.`
              : "The service fee is paid from My Requests after submitting."
          }
        >
          <Controller
            control={control}
            name="serviceId"
            render={({ field }) => (
              <Select
                value={field.value ?? ""}
                onValueChange={field.onChange}
                disabled={!departmentId || servicesPending}
              >
                <SelectTrigger
                  id="service"
                  className={selectClass}
                  aria-invalid={!!errors.serviceId}
                >
                  <SelectValue
                    placeholder={
                      !departmentId
                        ? "Select a category first"
                        : servicesPending
                          ? "Loading..."
                          : departmentServices.length === 0
                            ? "No services available"
                            : "Select a service"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {departmentServices.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name} • Fee {s.fee}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      )}

      {/* Description */}
      <Field
        id="description"
        label="Description *"
        error={errors.description?.message}
        hint="Include specific visual markers, estimated sizes, and hazards to aid prompt field assessment."
      >
        <Textarea
          id="description"
          rows={5}
          aria-invalid={!!errors.description}
          className="min-h-32 resize-y"
          {...register("description")}
        />
      </Field>

      {/* Location */}
      <Field
        id="location"
        label="Location *"
        icon={MapPin}
        error={errors.location?.message}
      >
        <Input
          id="location"
          placeholder="e.g. Corner of Elm St & 5th Ave, near Lincoln Elementary"
          aria-invalid={!!errors.location}
          className="h-11 pl-9"
          {...register("location")}
        />
      </Field>

      {/* Image */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-900">
          Image <span className="font-normal text-slate-500">(Optional)</span>
        </p>
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <RequestImageUploadField
              value={field.value}
              onChange={(file) => {
                field.onChange(file);
                void trigger("image");
              }}
              error={errors.image?.message}
            />
          )}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end">
        <Button asChild variant="ghost" className="font-semibold">
          <Link href="/citizen/my-requests">Cancel</Link>
        </Button>
        <Button
          type="submit"
          disabled={isRequestCreating}
          className="h-11 bg-blue-600 px-6 font-semibold hover:bg-blue-700"
        >
          {isRequestCreating ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <>
              <Send className="size-4" aria-hidden />
              Submit Request
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
