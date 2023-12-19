import { Select, SelectItem } from '@nextui-org/select';
import { useRecoilState } from 'recoil';
import { ColorSchemes, colorSchemeDetails, userState } from '../../store';
import { useTheme } from 'next-themes';

export default function SelectedColorScheme() {
  const [user, setUser] = useRecoilState(userState);
  const { theme, setTheme } = useTheme();

  const currentColorScheme = colorSchemeDetails.find(
    (scheme) => scheme.value === theme,
  );

  const handleColorSchemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedColorScheme: ColorSchemes = e.target.value as ColorSchemes;
    setUser({ ...user, prefersColorScheme: selectedColorScheme });
    setTheme(selectedColorScheme);
  };

  return (
    <Select
      items={colorSchemeDetails}
      label="Farbschema"
      className="max-w-xs"
      onChange={handleColorSchemeChange}
      defaultSelectedKeys={
        currentColorScheme?.value && [currentColorScheme.value]
      }
    >
      {(colorScheme) => (
        <SelectItem key={colorScheme.value}>{colorScheme.label}</SelectItem>
      )}
    </Select>
  );
}
