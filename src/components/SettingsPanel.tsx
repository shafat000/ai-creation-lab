
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import { AIModel } from './ModelSelector';
import ModelSelector from './ModelSelector';

interface Settings {
  temperature: number;
  maxTokens: number;
  topP: number;
}

interface SettingsPanelProps {
  settings: Settings;
  onUpdateSettings: (settings: Partial<Settings>) => void;
  models: AIModel[];
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onUpdateSettings,
  models,
  selectedModel,
  onSelectModel
}) => {
  return (
    <div className="h-full overflow-y-auto pb-20">
      <div className="px-4 py-6 space-y-8">
        <ModelSelector 
          models={models}
          selectedModel={selectedModel}
          onSelectModel={onSelectModel}
        />
        
        <Accordion type="single" collapsible defaultValue="parameters">
          <AccordionItem value="parameters">
            <AccordionTrigger className="text-base font-medium">
              Generation Parameters
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6 pt-2">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="temperature">Temperature: {settings.temperature.toFixed(1)}</Label>
                  </div>
                  <Slider
                    id="temperature"
                    min={0}
                    max={2}
                    step={0.1}
                    value={[settings.temperature]}
                    onValueChange={([value]) => onUpdateSettings({ temperature: value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Controls randomness: Lower values are more deterministic, higher values are more creative.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="topP">Top P: {settings.topP.toFixed(1)}</Label>
                  </div>
                  <Slider
                    id="topP"
                    min={0}
                    max={1}
                    step={0.05}
                    value={[settings.topP]}
                    onValueChange={([value]) => onUpdateSettings({ topP: value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Controls diversity via nucleus sampling: 0.5 means half of probability mass is considered.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="maxTokens">Max Output Length: {settings.maxTokens}</Label>
                  </div>
                  <Slider
                    id="maxTokens"
                    min={50}
                    max={1000}
                    step={50}
                    value={[settings.maxTokens]}
                    onValueChange={([value]) => onUpdateSettings({ maxTokens: value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum number of tokens to generate in the response.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="capabilities">
            <AccordionTrigger className="text-base font-medium">
              Model Capabilities
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {models.find(m => m.id === selectedModel)?.capabilities.map((capability, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="min-w-2 min-h-2 rounded-full bg-primary mt-2" />
                    <p className="text-sm">{capability}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default SettingsPanel;
