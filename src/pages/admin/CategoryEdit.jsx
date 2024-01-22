import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Button, Typography, Card } from "@material-tailwind/react";
import { toast } from "react-toastify";
import CustomSpinner from "../../components/CustomSpinner";
import axios from "axios";
import { useGetCategoryDetailsQuery } from "../../slices/productsApiSlice";
import useCategoryValidation from "../../utils/useCategoryValidation";

export default function CategoryEdit() {
  const { id } = useParams();
  const [name, setName] = useState("");

  const values = {
    id,
    name,
  };

  const user = useSelector((store) => store.auth.userInfo);
  const token = user.token;
  const headers = {
    Authorization: `Bearer ${token}`,
    authorization: `Bearer ${token}`,
  };

  const { data, isLoading, refetch } = useGetCategoryDetailsQuery(id);

  const targetCategory = data?.data?.name;

  const navigate = useNavigate();

  const { formattedCategory, validateAndSetCategory } = useCategoryValidation();

  const submitHandler = async (e) => {
    e.preventDefault();

    const transformedValues = {
      ...values,
      name: formattedCategory, // Use the formatted name from the hook
    };

    try {
      if (!transformedValues.name) {
        toast.error("You must enter the brand name");
        return;
      }

      const res = await axios.put(
        `hhttps://backend-production-9647.up.railway.app/categories/${id}`,
        transformedValues,
        {
          headers: headers,
        }
      );

      console.log(res);
      toast.success("Category updated");
      refetch();
      navigate("/admin/categorylist");
    } catch (err) {
      console.log(err?.response?.data?.data);
      toast.error(err?.response?.data?.data || err.error);
    }
  };

  useEffect(() => {
    if (targetCategory) {
      setName(targetCategory || "");
    }
  }, [targetCategory]);

  return (
    <>
      <Link
        to="/admin/categorylist"
        className="dark:text-white mx-auto flex max-w-2xl items-center space-x-2 px-4 pt-5 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        &larr; <span className="ml-2 dark:text-white">Back to Brand List</span>
      </Link>
      <Card
        color="transparent"
        shadow={false}
        className="h-screen min-w-max  m-auto flex flex-col  justify-center items-center"
      >
        <form onSubmit={submitHandler} className="mt-8 mb-2 min-w-max  sm:w-96">
          <div className="mb-1 flex flex-col gap-6 grid grid-cols-2  gap-4">
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-white -mb-3"
            >
              Category Name
            </Typography>
            <Input
              name="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validateAndSetCategory(e.target.value);
              }}
              id="name"
              size="lg"
              placeholder="Category Name"
              className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 dark:text-white  focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {isLoading && <CustomSpinner />}
          <Button
            className="mt-6 bg-[#151725] hover:bg-[#151729]"
            fullWidth
            disabled={isLoading}
            type="submit"
            onSubmit={submitHandler}
          >
            {isLoading ? "Updating..." : "Update Category"}
          </Button>
        </form>
      </Card>
    </>
  );
}
