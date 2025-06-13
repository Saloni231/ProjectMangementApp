import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../UI/Input";
import Button from "../UI/Button";
import SelectField from "../UI/SelectField";
import MultiSelectDropdown from "../UI/MultiSelect";
import { useProjects } from "../store/projectData";
import { useEffect } from "react";

type Project = {
  projectName: string;
  projectDescription: string;
  startDate: string;
  endDate: string;
  status: string;
  teamMember: string[];
};

interface FormProps {
  handleClose: Function;
  edit: boolean;
  projectData?: Project;
}

const defaultValues: Project = {
  projectName: "",
  projectDescription: "",
  startDate: "",
  endDate: "",
  status: "",
  teamMember: [],
};

const validationSchema: yup.ObjectSchema<Project> = yup.object({
  projectName: yup.string().required("Project name is required"),
  projectDescription: yup.string().required("Project description is required"),
  startDate: yup
    .string()
    .transform((value, originalValue) => {
      if (originalValue instanceof Date) {
        return originalValue.toISOString().split("T")[0];
      }
      return originalValue;
    })
    .required("Start date is required"),
  endDate: yup
    .string()
    .transform((value, originalValue) => {
      if (originalValue instanceof Date) {
        return originalValue.toISOString().split("T")[0];
      }
      return originalValue;
    })
    .required("End date is required")
    .test(
      "is-after-start",
      "End date must be after start date",
      function (value) {
        const { startDate } = this.parent;
        return new Date(value) >= new Date(startDate);
      }
    ),
  status: yup.string().required("Status is required"),
  teamMember: yup
    .array()
    .of(yup.string().required())
    .min(1, "Select at least one team member")
    .required("Select at least one team member"),
});

const Form: React.FC<FormProps> = ({ handleClose, edit, projectData }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Project>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { addProject, error, editProject } = useProjects();

  const onSubmit = (data: Project) => {
    const onClose = () => {
      reset();
      handleClose();
    };

    if (edit) {
      editProject({ ...projectData, ...data }, onClose);
    } else {
      addProject(data, onClose);
    }
  };

  useEffect(() => {
    if (edit && projectData) {
      reset(projectData);
    }
  }, [edit, projectData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="projectName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputField
            placeholder="projectName"
            label="Project Name"
            type="text"
            {...field}
            error={errors.projectName?.message}
          />
        )}
      />
      <Controller
        name="projectDescription"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputField
            placeholder="projectDescription"
            label="Project Description"
            type="textarea"
            {...field}
            error={errors.projectDescription?.message}
          />
        )}
      />
      <Controller
        name="startDate"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputField
            placeholder="startDate"
            label="Start Date"
            type="date"
            {...field}
            error={errors.startDate?.message}
          />
        )}
      />
      <Controller
        name="endDate"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputField
            placeholder="endDate"
            label="End Date"
            type="date"
            {...field}
            error={errors.endDate?.message}
          />
        )}
      />
      <Controller
        name="status"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <SelectField
            placeholder="status"
            label="Status"
            selected={field.value}
            options={["Active", "On Hold", "Completed"]}
            {...field}
            selectRef={field.ref}
            error={errors.status?.message}
          />
        )}
      />

      <Controller
        name="teamMember"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <MultiSelectDropdown
            label="teamMember"
            selectedValues={field.value}
            {...field}
            inputRef={field.ref}
            error={errors.teamMember?.message}
          />
        )}
      />

      <Button type="submit" classList="mt-5 w-full">
        {edit ? "Edit" : "Create"}
      </Button>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </form>
  );
};

export default Form;
