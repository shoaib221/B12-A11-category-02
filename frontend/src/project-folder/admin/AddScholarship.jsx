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
    // const watchHobbies = watch("hobbies");

    return (
        <div className="max-w-xl p-6 bg-white rounded-2xl shadow-md">
            

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Name */}
                <label className="block mb-3">
                    <span className="text-sm font-medium">Scholarship Name</span>
                    <input
                        type="text"
                        {...register("scholarshipName", { required: "Scholarship name is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. Fullbright Scholarship"
                    />
                    {errors.scholarshipName && <p className="text-red-600 text-sm mt-1">{errors.scholarshipName?.message}</p>}
                </label>


                <label className="block mb-3">
                    <span className="text-sm font-medium">University Name</span>
                    <input
                        type="text"
                        {...register("universityName", { required: "University name is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. Oxford University"
                    />
                    {errors.universityName && <p className="text-red-600 text-sm mt-1">{errors.universityName.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Image URL</span>
                    <input
                        type="text"
                        {...register("image", { required: "Image URL is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. https://example.com/avatar.jpg"
                    />
                    {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Country</span>
                    <input
                        type="text"
                        {...register("country", { required: "Country is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. Argentina"
                    />
                    {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">City</span>
                    <input
                        type="text"
                        {...register("city", { required: "City is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. Buens Aires"
                    />
                    {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">World Rank</span>
                    <input
                        type="text"
                        {...register("worldRank", { required: "World Rank is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. 128"
                    />
                    {errors.worldRank && <p className="text-red-600 text-sm mt-1">{errors.worldRank.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Subject Category</span>
                    <input
                        type="text"
                        {...register("subjectCategory", { required: "Subject Category is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. Mathematics"
                    />
                    {errors.subjectCategory && <p className="text-red-600 text-sm mt-1">{errors.subjectCategory.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Scholarship Category</span>
                    <input
                        type="text"
                        {...register("scholarshipCategory", { required: "Scholarship category is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. Full-funded"
                    />
                    {errors.scholarshipCategory && <p className="text-red-600 text-sm mt-1">{errors.scholarshipCategory.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Degree</span>
                    <input
                        type="text"
                        {...register("degree", { required: "Degree is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. Bachelor's"
                    />
                    {errors.degree && <p className="text-red-600 text-sm mt-1">{errors.degree.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Tuition Fees (USD)</span>
                    <input
                        type="number"
                        {...register("tuitionFees", { required: "Tuition fees is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. 1000"
                    />
                    {errors.tuitionFees && <p className="text-red-600 text-sm mt-1">{errors.tuitionFees.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Application Fees (USD)</span>
                    <input
                        type="number"
                        {...register("applicationFees", { required: "Application fees is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. 20"
                    />
                    {errors.applicationFees && <p className="text-red-600 text-sm mt-1">{errors.applicationFees.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Service Charge (USD)</span>
                    <input
                        type="number"
                        {...register("serviceCharge", { required: "Service charge is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. 20"
                    />
                    {errors.serviceCharge && <p className="text-red-600 text-sm mt-1">{errors.serviceCharge.message}</p>}
                </label>

                <label className="block mb-3">
                    <span className="text-sm font-medium">Deadline (YYYY/MM/DD) </span>
                    <input
                        type="text"
                        {...register("deadline", { required: "Deadline is required", minLength: { value: 2, message: "Too short" } })}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="i.g. 2026/12/31"
                    />
                    {errors.deadline && <p className="text-red-600 text-sm mt-1">{errors.deadline.message}</p>}
                </label>



                {/* Submit button */}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="button-1234 hover:opacity-90 disabled:opacity-60"
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