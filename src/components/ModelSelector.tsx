
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export interface AIModel {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
}

interface ModelSelectorProps {
  models: AIModel[];
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ 
  models, 
  selectedModel, 
  onSelectModel 
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="model-selector">Model</Label>
      <Select value={selectedModel} onValueChange={onSelectModel}>
        <SelectTrigger id="model-selector" className="w-full">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem 
              key={model.id} 
              value={model.id}
              className="flex flex-col items-start"
            >
              <span className="font-medium">{model.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {models.find(m => m.id === selectedModel) && (
        <p className="text-sm text-muted-foreground">
          {models.find(m => m.id === selectedModel)?.description}
        </p>
      )}
    </div>
  );
};

export default ModelSelector;
