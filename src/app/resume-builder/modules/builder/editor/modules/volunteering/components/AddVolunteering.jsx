import React, { useMemo } from 'react';
import { OutlinedButton } from '../../../../../../helpers/common/atoms/Buttons';
import { useVoluteeringStore } from '../../../../../../stores/volunteering';

const NEW_VOLUNTEER_EXP = {
  organization: '',
  position: '',
  startDate: null,
  isVolunteeringNow: false,
  endDate: null,
  summary: '',
  id: '',
  url: '',
  highlights: [],
};

const AddVolunteeringExp = ({ handleChange, isEmpty }) => {
  const addNewVolunteeringExperience = useVoluteeringStore((state) => state.add);

  const onCreateVolunteeringExperience = () => {
    const uniqueExpandedId = `${Math.random()}`;
    NEW_VOLUNTEER_EXP.id = uniqueExpandedId;
    addNewVolunteeringExperience(NEW_VOLUNTEER_EXP);
    handleChange(uniqueExpandedId, true);
  };

  const buttonCaption = useMemo(() => {
    return isEmpty ? '+ Add a volunteering experience' : '+ Add more';
  }, [isEmpty]);

  return (
    <div className="flex gap-2 mt-3">
      <OutlinedButton onClick={onCreateVolunteeringExperience} disabled={false}>
        {buttonCaption}
      </OutlinedButton>
    </div>
  );
};

export default AddVolunteeringExp;
