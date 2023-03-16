import { commonAxios } from 'api/common';
import React, { useEffect, useState } from 'react';
import {
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

const ScoreClass = () => {
  const [classList, setClassList] = useState<ClassType[]>([]);
  const [selectedClass, setSelectedClass] = useState<number>();
  const [selectedClassLabel, setSelectedClassLabel] = useState<string>();
  const [selectedStudents, setSelectedStudents] = useState<any[]>([]);
  const [examsReport, setExamsReport] = useState<any[]>([]);

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${selectedClassLabel}`,
      },
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const randomColor = () => {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };

  const data = {
    labels,
    datasets: [
      {
        label: '점수',
        data: [100],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Root>
      <TitleTypo level={2}>반별 성적표</TitleTypo>
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
        {selectedClass &&
          examsReport.reverse().map((value, index) => {
            let newSelectedStudents = [...selectedStudents];
            let newStudentsName: any[] = [];
            const datasets = value.submissions
              .filter((value2: any) => {
                if (newSelectedStudents.includes(value2.student.id)) {
                  newSelectedStudents = newSelectedStudents.filter(
                    (value3) => value3 !== value2.student.id
                  );
                  return true;
                }
                return false;
              })
              .map((value2: any) => {
                newStudentsName.push(value2.student.name);
                return {
                  label: value2.student.name,
                  data: [value2.score],
                  backgroundColor: randomColor(),
                };
              });
            if (datasets.length === 0) {
              return <></>;
            }
            return (
              <Bar
                data={{ ...data, labels: ['시험 점수'], datasets }}
                options={{
                  ...options,
                  plugins: {
                    ...options.plugins,
                    title: { display: true, text: value.material_name },
                  },
                }}
                key={`bar_${index}`}
              />
            );
          })}
      </MenuContainer>
    </Root>
  );
};

export default ScoreClass;
