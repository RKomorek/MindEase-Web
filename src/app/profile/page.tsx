'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import SafeAreaWrapper from '@/components/ui/safe-area-wrapper';
import { ThemedView } from '@/components/ui/themed-view';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToggleRow } from '@/components/ui/toggle-row';
import { StepperRow } from '@/components/ui/stepper-row';

import { useSettingsStore } from '@/shared/stores/settings-store';
import { useThemeColor } from '@/shared/hooks/use-theme-color';
import { useCognitiveScreenTitleStyle, useCognitiveSpacing } from '@/components/ui/cognitive-styles';

export default function ProfilePage() {

  const router = useRouter()

  const foreground = useThemeColor({}, 'foreground')
  const muted = useThemeColor({}, 'muted')

  const titleStyle = useCognitiveScreenTitleStyle()
  const { pad, gap } = useCognitiveSpacing()

  const {
    themePreference,
    setThemePreference,
    animationsEnabled,
    setAnimationsEnabled,
    cognitiveAlertsEnabled,
    setCognitiveAlerts,
    cognitiveAlertMinutes,
    setCognitiveAlertMinutes,
    contrastIntensity,
    setContrastIntensity,
    spacingIntensity,
    setSpacingIntensity,
    fontScale,
    setFontScale,
  } = useSettingsStore()

  const [name, setName] = useState('')
  const [needs, setNeeds] = useState('')
  const [routine, setRoutine] = useState('')

  return (

    <SafeAreaWrapper>

      <ThemedView
        style={{
          flex: 1,
          minHeight: '100vh',
          padding: pad,
        }}
      >

        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 32
          }}
        >

          {/* HEADER */}

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

            <Button
              title="←"
              variant="ghost"
              onClick={() => router.push('/')}
              style={{ minWidth: 44 }}
            />

            <h1 style={{ ...titleStyle, color: foreground, margin: 0 }}>
              Configurações
            </h1>

          </div>

          {/* GRID */}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24
            }}
          >

            {/* PERFIL */}

            <Card style={{ display: 'flex', flexDirection: 'column', gap: gap }}>

              <h2 style={{ fontSize: 18, fontWeight: 600, color: foreground }}>
                Perfil
              </h2>

              <label style={{ color: foreground }}>Nome de exibição</label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como você quer ser chamado?"
                style={{
                  padding: 10,
                  borderRadius: 10,
                  border: '1px solid #ccc',
                  color: foreground
                }}
              />

              <label style={{  color: foreground }}>Necessidades específicas</label>

              <textarea
                value={needs}
                onChange={(e) => setNeeds(e.target.value)}
                rows={4}
                placeholder="Ex: Evitar muitos elementos na tela, lembretes suaves, etc."
                style={{
                  padding: 10,
                  borderRadius: 10,
                  border: '1px solid #ccc',
                  color: foreground
                }}
              />

              <label style={{ color: foreground }}>Rotinas</label>

              <textarea
                value={routine}
                onChange={(e) => setRoutine(e.target.value)}
                rows={4}
                placeholder="Ex: Manhã: estudo, tarde: exercício, noite: ver série"
                style={{
                  padding: 10,
                  borderRadius: 10,
                  border: '1px solid #ccc',
                  color: foreground
                }}
              />

              <Button title="Salvar perfil" />

            </Card>

            {/* APARÊNCIA + ACESSIBILIDADE */}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              <Card style={{ display: 'flex', flexDirection: 'column', gap: gap }}>

                <h2 style={{ fontSize: 18, fontWeight: 600, color: foreground }}>
                  Aparência
                </h2>

                <div style={{ display: 'flex', gap: 12 }}>

                  <Button
                    title="Sistema"
                    variant={themePreference === 'system' ? 'primary' : 'secondary'}
                    onClick={() => void setThemePreference('system')}
                  />

                  <Button
                    title="Claro"
                    variant={themePreference === 'light' ? 'primary' : 'secondary'}
                    onClick={() => void setThemePreference('light')}
                  />

                  <Button
                    title="Escuro"
                    variant={themePreference === 'dark' ? 'primary' : 'secondary'}
                    onClick={() => void setThemePreference('dark')}
                  />

                </div>

              </Card>

              <Card style={{ display: 'flex', flexDirection: 'column', gap: gap }}>

                <h2 style={{ fontSize: 18, fontWeight: 600, color: foreground }}>
                  Acessibilidade
                </h2>

                <StepperRow
                  label="Contraste"
                  valueLabel={String(contrastIntensity)}
                  onDec={() => void setContrastIntensity(Math.max(0, contrastIntensity - 1))}
                  onInc={() => void setContrastIntensity(Math.min(3, contrastIntensity + 1))}
                />

                <StepperRow
                  label="Espaçamento"
                  valueLabel={String(spacingIntensity)}
                  onDec={() => void setSpacingIntensity(Math.max(0, spacingIntensity - 1))}
                  onInc={() => void setSpacingIntensity(Math.min(3, spacingIntensity + 1))}
                />

                <StepperRow
                  label="Fonte"
                  valueLabel={fontScale.toFixed(1)}
                  onDec={() => void setFontScale(Math.max(0.9, fontScale - 0.1))}
                  onInc={() => void setFontScale(Math.min(1.4, fontScale + 0.1))}
                />

              </Card>

            </div>

          </div>

          {/* ALERTAS */}

          <Card style={{ display: 'flex', flexDirection: 'column', gap: gap }}>

            <h2 style={{ fontSize: 18, fontWeight: 600, color: foreground }}>
              Alertas e animações
            </h2>

            <ToggleRow
              label="Alertas cognitivos"
              value={cognitiveAlertsEnabled}
              onChange={(v) => void setCognitiveAlerts(v)}
              description="Lembretes de pausa"
            />

            <StepperRow
              label="Intervalo (min)"
              valueLabel={String(cognitiveAlertMinutes)}
              onDec={() => void setCognitiveAlertMinutes(Math.max(5, cognitiveAlertMinutes - 5))}
              onInc={() => void setCognitiveAlertMinutes(Math.min(120, cognitiveAlertMinutes + 5))}
            />

            <ToggleRow
              label="Animações"
              value={animationsEnabled}
              onChange={(v) => void setAnimationsEnabled(v)}
            />

          </Card>

        </div>

      </ThemedView>

    </SafeAreaWrapper>
  )
}