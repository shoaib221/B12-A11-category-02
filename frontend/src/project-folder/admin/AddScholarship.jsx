import { useForm, Controller } from "react-hook-form";
import { useAuthContext } from "../../auth/context";

export const AddScholarship = () => {
    const { axiosInstance } = useAuthContext();

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            scholarshipName: "",
            universityName: "",
            image: "",
            country: "",
            city: "",
            worldRank: "",
            subjectCategory: "",
            scholarshipCategory: "",
            degree: "",
            tuitionFees: "",
            applicationFees: "",
            serviceCharge: "",
            deadline: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            let res = await axiosInstance.post("/scholarship/add", data)

            console.log(res.data)
            reset();
        } catch (err) {
            console.error(err);
        }



        // reset the form after submit

    };

    // watch fields if you want to react to changes
    const watchHobbies = watch("hobbies");

    return (
        <div className="max-w-xl p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Add a scholarship</h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Name */}
                <label className="block mb-3">
                    <span className="text-sm font-medium">Scholarship Name</span>
                    <input
                        type="text"
                        {...register("scholarshipName", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. Fullbright Scholarship"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </label>


                <label className="block mb-3">
                    <span className="text-sm font-medium">University Name</span>
                    <input
                        type="text"
                        {...register("universityName", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. Oxford University"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Image URL</span>
                    <input
                        type="text"
                        {...register("image", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. https://example.com/avatar.jpg"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Country</span>
                    <input
                        type="text"
                        {...register("country", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. Argentina"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">City</span>
                    <input
                        type="text"
                        {...register("city", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. Buens Aires"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">World Rank</span>
                    <input
                        type="text"
                        {...register("worldRank", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. 128"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Subject Category</span>
                    <input
                        type="text"
                        {...register("subjectCategory", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. Mathematics"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Scholarship Category</span>
                    <input
                        type="text"
                        {...register("scholarshipCategory", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. Full-funded"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Degree</span>
                    <input
                        type="text"
                        {...register("degree", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. Bachelor's"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Tuition Fees (USD)</span>
                    <input
                        type="number"
                        {...register("tuitionFees", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. 1000"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Application Fees (USD)</span>
                    <input
                        type="number"
                        {...register("applicationFees", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. 20"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Service Charge (USD)</span>
                    <input
                        type="number"
                        {...register("serviceCharge", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. 20"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Deadline (YYYY/MM/DD) </span>
                    <input
                        type="text"
                        {...register("deadline", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. 2026/12/31"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </label>



                {/* Submit button */}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>

                    <button
                        type="button"
                        onClick={() => reset()}
                        className="px-3 py-2 rounded-lg border ml-3"
                    >
                        Reset
                    </button>
                </div>
            </form>

        </div>
    );



}