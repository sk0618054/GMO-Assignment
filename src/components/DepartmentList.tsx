// src/components/DepartmentList.tsx
import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Checkbox,
  IconButton,
  ListItemButton,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface Department {
  department: string;
  sub_departments: string[];
}

const departments: Department[] = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
  // Add more departments as needed
];

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  flexGrow: 1,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (department: string) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [department]: !prevOpen[department],
    }));
  };

  const handleSelect = (department: string) => {
    const subDepartments =
      departments.find((dep) => dep.department === department)
        ?.sub_departments || [];
    const allSelected = subDepartments.every((subDep) => selected[subDep]);

    if (allSelected) {
      // Deselect all sub-departments and the department itself
      const newSelected = { ...selected };
      subDepartments.forEach((subDep) => delete newSelected[subDep]);
      delete newSelected[department];
      setSelected(newSelected);
    } else {
      // Select all sub-departments and the department itself
      const newSelected = { ...selected, [department]: true };
      subDepartments.forEach((subDep) => (newSelected[subDep] = true));
      setSelected(newSelected);
    }
  };

  const handleSelectSub = (department: string, subDepartment: string) => {
    const newSelected = {
      ...selected,
      [subDepartment]: !selected[subDepartment],
    };

    const subDepartments =
      departments.find((dep) => dep.department === department)
        ?.sub_departments || [];
    const allSelected = subDepartments.every((subDep) => newSelected[subDep]);

    if (allSelected) {
      newSelected[department] = true;
    } else {
      delete newSelected[department];
    }

    setSelected(newSelected);
  };

  return (
    <List>
      {departments.map((department) => (
        <div key={department.department}>
          <StyledListItem>
            <StyledIconButton
              edge="start"
              onClick={() => handleToggle(department.department)}
            >
              {open[department.department] ? <ExpandLess /> : <ExpandMore />}
            </StyledIconButton>
            <Checkbox
              edge="start"
              checked={!!selected[department.department]}
              tabIndex={-1}
              disableRipple
              onClick={() => handleSelect(department.department)}
            />
            <StyledListItemText
              primary={department.department}
              onClick={() => handleSelect(department.department)}
            />
          </StyledListItem>
          <Collapse
            in={open[department.department]}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {department.sub_departments.map((subDepartment) => (
                <ListItemButton
                  key={subDepartment}
                  style={{ paddingLeft: 32 }}
                  onClick={() =>
                    handleSelectSub(department.department, subDepartment)
                  }
                >
                  <Checkbox
                    edge="start"
                    checked={!!selected[subDepartment]}
                    tabIndex={-1}
                    disableRipple
                  />
                  <StyledListItemText primary={subDepartment} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
