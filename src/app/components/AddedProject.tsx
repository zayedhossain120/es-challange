import React from "react";
import { useDispatch } from "react-redux";
import { deleteProjectItem } from "../store/slices/projectSlice";

const AddedProject = ({ data }: any) => {
  const dispatch = useDispatch();

  const handleDeleteItem = (projectIndex: number, itemIndex: number) => {
    dispatch(deleteProjectItem({ projectIndex, itemIndex }));
  };

  return (
    <div>
      {data?.projects?.length &&
        data?.projects?.map((project: any, projectIndex: number) => (
          <div key={projectIndex} className="flex flex-col gap-5">
            <div className="flex justify-between w-full gap-10 border-b-2 border-green-300">
              <h3 className="text-2xl text-green-500">
                {project?.projectName}
              </h3>
              <p>
                ({project?.totalHours} h {project?.totalMinutes} m )
              </p>
            </div>

            {project?.items.map((item: any, itemIndex: number) => (
              <div
                className="flex items-center justify-between gap-7 mb-8"
                key={itemIndex}
              >
                <div>
                  <p>{item?.title}</p>
                  <p>
                    {item?.hours} Hours, {item?.minutes} Minutes
                  </p>
                </div>
                <button
                  className="text-red-600"
                  onClick={() => handleDeleteItem(projectIndex, itemIndex)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default AddedProject;
