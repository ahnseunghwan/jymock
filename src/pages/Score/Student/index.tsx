import { commonAxios } from 'api/common';
import React, { useEffect, useState } from 'react';
import {
  ContentActionButton,
  ContentActionButtonTypo,
  ContentContainer,
  ContentSelect,
  ContentSelectOption,
  MenuContainer,
  Root,
  TitleTypo,
} from './styled';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ClassType = {
  label: string;
  id: number;
  students: number[];
};

const ScoreStudent = () => {
  const [classList, setClassList] = useState<ClassType[]>([]);
  const [selectedClass, setSelectedClass] = useState<number>();
  const [selectedClassLabel, setSelectedClassLabel] = useState<string>();
  const [selectedStudents, setSelectedStudents] = useState<any[]>([]);
  const [examsReport, setExamsReport] = useState<any[]>([]);
  const [attendees, setAttendees] = useState<any[]>([]);

  useEffect(() => {
    commonAxios({
      url: 'class-divisions/',
      method: 'GET',
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setClassList(
          res.data.map((value: any) => ({
            id: value.id,
            label: `${value.curriculum.name} - ${value.name}`,
            students: value.students,
          }))
        );
      } else {
        alert('서버 오류');
      }
    });
    commonAxios({
      url: `exams/report`,
      method: 'GET',
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setExamsReport(res.data);
      } else {
        alert('서버 오류');
      }
    });
  }, []);

  useEffect(() => {
    if (selectedClass) {
      commonAxios({
        url: `class-divisions/${selectedClass}/attendees`,
        method: 'GET',
      }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setAttendees(res.data.attendees);
        } else {
          alert('서버 오류');
        }
      });
    }
  }, [selectedClass]);

  return (
    <Root>
      <TitleTypo level={2}>학생별 성적표</TitleTypo>
      <MenuContainer>
        <ContentSelect
          value={selectedClassLabel}
          onChange={(value: any) => {
            const newValue = JSON.parse(value);
            setSelectedClass(newValue.id);
            setSelectedClassLabel(newValue.label);
            setSelectedStudents(newValue.students);
          }}
          placeholder='분반을 선택해주세요.'
        >
          {
            classList.map((classItem: ClassType, index: number) => {
              return (
                <ContentSelectOption
                  value={JSON.stringify(classItem)}
                  key={`content_select_option_${index}`}
                >
                  {classItem.label}
                </ContentSelectOption>
              );
            })}
        </ContentSelect>
      </MenuContainer>
      <ContentContainer>
        {attendees.map((attendee, index) => (
          <ContentActionButton
            onClick={() => {
              window.open(
                `/score/print?id=${attendee.id}&class_id=${selectedClass}`
              );
            }}
            key={`content_action_button_attendee_${index}`}
          >
            <ContentActionButtonTypo>
              {attendee.student.name}
            </ContentActionButtonTypo>
          </ContentActionButton>
        ))}
      </ContentContainer>
    </Root>
  );
};

export default ScoreStudent;
