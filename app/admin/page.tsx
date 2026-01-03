"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { ImageDropzone } from "../../components/ui/image-dropzone";
import { RichTextEditor } from "../../components/ui/rich-text-editor";
import { Modal } from "../../components/ui/modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import type { Article, Employee, GalleryImage, Podcast } from "../../lib/types";
import { resetCMSData } from "../../lib/cms-data";
import { getAdminSession, setAdminSession, verifyCredentials } from "../../lib/admin-auth";
import { useCMSData } from "../../lib/use-cms";
import { getImageUrl } from "../../lib/utils";

const createId = (prefix: string) =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}`;

const getToday = () => new Date().toISOString().slice(0, 10);

const emptyArticle: Article = {
  id: "",
  title: "",
  dek: "",
  content: "",
  author: "",
  date: getToday(),
  category: "",
  readTime: "",
  image: ""
};

const emptyPodcast: Podcast = {
  id: "",
  title: "",
  description: "",
  host: "",
  date: getToday(),
  videoUrl: ""
};

const emptyImage: GalleryImage = {
  id: "",
  title: "",
  url: ""
};

const emptyEmployee: Employee = {
  id: "",
  name: "",
  role: "",
  bio: "",
  image: ""
};

export default function AdminPage() {
  const { data, update } = useCMSData();
  const [articleForm, setArticleForm] = useState<Article>(emptyArticle);
  const [podcastForm, setPodcastForm] = useState<Podcast>(emptyPodcast);
  const [imageForm, setImageForm] = useState<GalleryImage>(emptyImage);
  const [employeeForm, setEmployeeForm] = useState<Employee>(emptyEmployee);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [showPodcastForm, setShowPodcastForm] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const isReady = useMemo(() => Boolean(data), [data]);

  useEffect(() => {
    setIsAuthed(getAdminSession());
  }, []);

  if (!data) {
    return <div className="mx-auto max-w-6xl px-6 py-24">Зареждане...</div>;
  }

  if (!isAuthed) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-col gap-6 px-6 py-20">
        <div>
          <p className="section-title">Админ достъп</p>
          <h1 className="font-display text-4xl text-foreground">
            Влез, за да управляваш съдържанието
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Администраторски вход</CardTitle>
            <CardDescription>
              Използвай данните от променливите на средата.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Потребител"
              value={loginUsername}
              onChange={(event) => setLoginUsername(event.target.value)}
            />
            <Input
              type="password"
              placeholder="Парола"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
            />
            {loginError && (
              <p className="text-sm text-red-600">{loginError}</p>
            )}
            <Button
              onClick={() => {
                const ok = verifyCredentials(loginUsername, loginPassword);
                if (!ok) {
                  setLoginError("Невалиден потребител или парола.");
                  return;
                }
                setLoginError("");
                setAdminSession(true);
                setIsAuthed(true);
              }}
            >
              Sign in
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleArticleSubmit = () => {
    const next = { ...articleForm };
    if (!next.title || !next.dek) {
      return;
    }
    if (next.id) {
      const updated = data.articles.map((article) =>
        article.id === next.id ? next : article
      );
      update({ ...data, articles: updated });
    } else {
      update({
        ...data,
        articles: [{ ...next, id: createId("article") }, ...data.articles]
      });
    }
    setArticleForm(emptyArticle);
    setShowArticleForm(false);
  };

  const handlePodcastSubmit = () => {
    const next = { ...podcastForm };
    if (!next.title || !next.videoUrl) {
      return;
    }
    if (next.id) {
      const updated = data.podcasts.map((podcast) =>
        podcast.id === next.id ? next : podcast
      );
      update({ ...data, podcasts: updated });
    } else {
      update({
        ...data,
        podcasts: [{ ...next, id: createId("podcast") }, ...data.podcasts]
      });
    }
    setPodcastForm(emptyPodcast);
    setShowPodcastForm(false);
  };

  const handleImageSubmit = () => {
    const next = { ...imageForm };
    if (!next.title) {
      return;
    }
    if (next.id) {
      const updated = data.images.map((image) =>
        image.id === next.id ? next : image
      );
      update({ ...data, images: updated });
    } else {
      update({
        ...data,
        images: [{ ...next, id: createId("image") }, ...data.images]
      });
    }
    setImageForm(emptyImage);
    setShowImageForm(false);
  };

  const handleEmployeeSubmit = () => {
    const next = { ...employeeForm };
    if (!next.name || !next.role) {
      return;
    }
    if (next.id) {
      const updated = data.employees.map((employee) =>
        employee.id === next.id ? next : employee
      );
      update({ ...data, employees: updated });
    } else {
      update({
        ...data,
        employees: [{ ...next, id: createId("employee") }, ...data.employees]
      });
    }
    setEmployeeForm(emptyEmployee);
    setShowEmployeeForm(false);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="section-title">Админ панел</p>
          <h1 className="font-display text-5xl text-foreground">
            Управление на съдържание
          </h1>
          <p className="mt-3 max-w-xl text-sm text-slate-600">
            Добавяй и редактирай статии, подкасти, снимки и екипа на страницата
            „За нас“. Панелът използва компоненти със shadcn стил.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={async () => {
              await resetCMSData();
            }}
          >
            Reset to defaults
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setAdminSession(false);
              setIsAuthed(false);
            }}
          >
            Log out
          </Button>
        </div>
      </div>

      <Tabs defaultValue="articles" className="mt-10">
        <TabsList>
          <TabsTrigger value="articles">Статии</TabsTrigger>
          <TabsTrigger value="podcasts">Подкасти</TabsTrigger>
          <TabsTrigger value="gallery">Галерия</TabsTrigger>
          <TabsTrigger value="team">Екип</TabsTrigger>
        </TabsList>

        <TabsContent value="articles">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Публикувани статии
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setArticleForm({ ...emptyArticle, date: getToday() });
                  setShowArticleForm(true);
                }}
              >
                New article
              </Button>
            </div>
            {data.articles.map((article) => (
              <Card key={article.id}>
                  <CardHeader>
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                    <CardDescription>
                      {article.category} · {article.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between gap-4">
                    <p className="text-sm text-slate-600">{article.dek}</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setArticleForm(article);
                        setShowArticleForm(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        update({
                          ...data,
                          articles: data.articles.filter(
                            (item) => item.id !== article.id
                          )
                        })
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="podcasts">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Публикувани подкасти
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPodcastForm({ ...emptyPodcast, date: getToday() });
                  setShowPodcastForm(true);
                }}
              >
                New podcast
              </Button>
            </div>
            {data.podcasts.map((podcast) => (
              <Card key={podcast.id}>
                  <CardHeader>
                    <CardTitle className="text-xl">{podcast.title}</CardTitle>
                    <CardDescription>
                      {podcast.host} · {podcast.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between gap-4">
                    <p className="text-sm text-slate-600">{podcast.description}</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setPodcastForm(podcast);
                        setShowPodcastForm(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        update({
                          ...data,
                          podcasts: data.podcasts.filter(
                            (item) => item.id !== podcast.id
                          )
                        })
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gallery">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="col-span-full flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Елементи в галерията
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setImageForm(emptyImage);
                  setShowImageForm(true);
                }}
              >
                New image
              </Button>
            </div>
            {data.images.map((image) => (
              <Card key={image.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{image.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={getImageUrl(image.url)}
                    alt={image.title}
                    className="h-40 w-full rounded-xl object-cover"
                  />
                  <div className="mt-3 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setImageForm(image);
                        setShowImageForm(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        update({
                          ...data,
                          images: data.images.filter(
                            (item) => item.id !== image.id
                          )
                        })
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="col-span-full flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Екип
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEmployeeForm(emptyEmployee);
                  setShowEmployeeForm(true);
                }}
              >
                New employee
              </Button>
            </div>
            {data.employees.map((employee) => (
              <Card key={employee.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{employee.name}</CardTitle>
                  <CardDescription>{employee.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={getImageUrl(employee.image)}
                    alt={employee.name}
                    className="h-40 w-full rounded-xl object-cover"
                  />
                  <p className="mt-3 text-sm text-slate-600">
                    {employee.bio}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEmployeeForm(employee);
                        setShowEmployeeForm(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        update({
                          ...data,
                          employees: data.employees.filter(
                            (item) => item.id !== employee.id
                          )
                        })
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {!isReady && (
        <div className="mt-10 rounded-2xl border border-border bg-muted p-6 text-sm text-slate-600">
          Зареждане на съдържанието...
        </div>
      )}

      <Modal
        open={showArticleForm}
        onClose={() => {
          setArticleForm(emptyArticle);
          setShowArticleForm(false);
        }}
        title={articleForm.id ? "Редакция на статия" : "Нова статия"}
        description="Публикувай нова история или обнови съществуваща."
      >
        <div className="space-y-4">
          <Input
            placeholder="Заглавие"
            value={articleForm.title}
            onChange={(event) =>
              setArticleForm({
                ...articleForm,
                title: event.target.value
              })
            }
          />
          <Input
            placeholder="Подзаглавие / дек"
            value={articleForm.dek}
            onChange={(event) =>
              setArticleForm({
                ...articleForm,
                dek: event.target.value
              })
            }
          />
          <RichTextEditor
            placeholder="Напиши пълния текст тук..."
            value={articleForm.content}
            onChange={(next) =>
              setArticleForm({
                ...articleForm,
                content: next
              })
            }
          />
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              placeholder="Автор"
              value={articleForm.author}
              onChange={(event) =>
                setArticleForm({
                  ...articleForm,
                  author: event.target.value
                })
              }
            />
            <Input
              placeholder="Дата (ГГГГ-ММ-ДД)"
              type="date"
              value={articleForm.date}
              onChange={(event) =>
                setArticleForm({
                  ...articleForm,
                  date: event.target.value
                })
              }
            />
            <Input
              placeholder="Категория"
              value={articleForm.category}
              onChange={(event) =>
                setArticleForm({
                  ...articleForm,
                  category: event.target.value
                })
              }
            />
            <Input
              placeholder="Време за четене (напр. 5 мин)"
              value={articleForm.readTime}
              onChange={(event) =>
                setArticleForm({
                  ...articleForm,
                  readTime: event.target.value
                })
              }
            />
          </div>
          <ImageDropzone
            label="Снимка към статията"
            value={articleForm.image}
            onChange={(next) =>
              setArticleForm({
                ...articleForm,
                image: next
              })
            }
          />
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleArticleSubmit}>
              {articleForm.id ? "Save changes" : "Publish"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setArticleForm(emptyArticle);
                setShowArticleForm(false);
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={showPodcastForm}
        onClose={() => {
          setPodcastForm(emptyPodcast);
          setShowPodcastForm(false);
        }}
        title={podcastForm.id ? "Редакция на подкаст" : "Нов подкаст"}
        description="Добави нов видео епизод в подкастите."
      >
        <div className="space-y-4">
          <Input
            placeholder="Заглавие"
            value={podcastForm.title}
            onChange={(event) =>
              setPodcastForm({
                ...podcastForm,
                title: event.target.value
              })
            }
          />
          <Textarea
            placeholder="Описание"
            value={podcastForm.description}
            onChange={(event) =>
              setPodcastForm({
                ...podcastForm,
                description: event.target.value
              })
            }
          />
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              placeholder="Водещ"
              value={podcastForm.host}
              onChange={(event) =>
                setPodcastForm({
                  ...podcastForm,
                  host: event.target.value
                })
              }
            />
            <Input
              placeholder="Дата (ГГГГ-ММ-ДД)"
              type="date"
              value={podcastForm.date}
              onChange={(event) =>
                setPodcastForm({
                  ...podcastForm,
                  date: event.target.value
                })
              }
            />
          </div>
          <Input
            placeholder="Видео URL (embed)"
            value={podcastForm.videoUrl}
            onChange={(event) =>
              setPodcastForm({
                ...podcastForm,
                videoUrl: event.target.value
              })
            }
          />
          <div className="flex flex-wrap gap-2">
            <Button onClick={handlePodcastSubmit}>
              {podcastForm.id ? "Save changes" : "Publish"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setPodcastForm(emptyPodcast);
                setShowPodcastForm(false);
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={showImageForm}
        onClose={() => {
          setImageForm(emptyImage);
          setShowImageForm(false);
        }}
        title={imageForm.id ? "Редакция на изображение" : "Ново изображение"}
        description="Обнови галерията със снимки и заглавия."
      >
        <div className="space-y-4">
          <Input
            placeholder="Заглавие"
            value={imageForm.title}
            onChange={(event) =>
              setImageForm({ ...imageForm, title: event.target.value })
            }
          />
          <ImageDropzone
            label="Снимка за галерията"
            value={imageForm.url}
            onChange={(next) => setImageForm({ ...imageForm, url: next })}
          />
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleImageSubmit}>
              {imageForm.id ? "Save changes" : "Add"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setImageForm(emptyImage);
                setShowImageForm(false);
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={showEmployeeForm}
        onClose={() => {
          setEmployeeForm(emptyEmployee);
          setShowEmployeeForm(false);
        }}
        title={employeeForm.id ? "Редакция на профил" : "Нов профил"}
        description="Страницата „За нас“ се обновява автоматично с тези профили."
      >
        <div className="space-y-4">
          <Input
            placeholder="Име"
            value={employeeForm.name}
            onChange={(event) =>
              setEmployeeForm({
                ...employeeForm,
                name: event.target.value
              })
            }
          />
          <Input
            placeholder="Роля"
            value={employeeForm.role}
            onChange={(event) =>
              setEmployeeForm({
                ...employeeForm,
                role: event.target.value
              })
            }
          />
          <Textarea
            placeholder="Кратка биография"
            value={employeeForm.bio}
            onChange={(event) =>
              setEmployeeForm({
                ...employeeForm,
                bio: event.target.value
              })
            }
          />
          <ImageDropzone
            label="Снимка на човека"
            value={employeeForm.image}
            onChange={(next) =>
              setEmployeeForm({
                ...employeeForm,
                image: next
              })
            }
          />
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleEmployeeSubmit}>
              {employeeForm.id ? "Save changes" : "Add"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setEmployeeForm(emptyEmployee);
                setShowEmployeeForm(false);
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
